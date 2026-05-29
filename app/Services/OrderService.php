<?php

namespace App\Services;

use App\Enums\InvoiceStatus;
use App\Enums\InvoicePaymentStatus;
use App\Enums\OrderStatus;
use App\Models\Invoice;
use App\Models\Order;
use App\Models\Product;
use Exception;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class OrderService
{
    /**
     * Create a new class instance.
     */
    public function __construct(protected InvoiceService $invoiceService) {}

    public function createOrder(array $data)
    {
        $subtotalAmount = array_sum(array_map(fn($i) => $i['quantity'] * $i['unit_price'], $data['items']));
        $data['subtotal'] = $subtotalAmount;
        DB::transaction(function () use ($data, $subtotalAmount) {
            $order = Order::create([
                'user_id' => $data['user_id'],
                'customer_id' => $data['customer_id'],
                'number' => $this->generateUniqueOrderNumber(),
                'subtotal' => $subtotalAmount,
                'status' => OrderStatus::PENDING,
                'note' => $data['note'] ?? null,
                'date' => $data['date'],
            ]);

            $order->load('invoices.payments');
            $this->storeOrderItems($order, $data['items']);
            $this->invoiceService->createInvoice($order, $data);
        });
    }

    public function updateOrder(Order $order, array $data)
    {
        $subtotalAmount = array_sum(array_map(fn($i) => $i['quantity'] * $i['unit_price'], $data['items']));
        $data['subtotal'] = $subtotalAmount;

        DB::transaction(function () use ($order, $data, $subtotalAmount) {
            $order->update([
                'customer_id' => $data['customer_id'],
                'subtotal' => $subtotalAmount,
                'status' => OrderStatus::PENDING,
                'note' => $data['note'] ?? null,
                'date' => $data['date'],
            ]);

            $order->load('invoices.payments');
            $this->restockAndDeleteOrderItems($order);
            $this->storeOrderItems($order, $data['items']);
            $this->invoiceService->createInvoice($order, $data);
        });
    }

    private function storeOrderItems(Order $order, array $items): void
    {
        foreach ($items as $item) {
            $order->items()->create([
                'product_id' => $item['product_id'],
                'quantity' => $item['quantity'],
                'unit_price' => $item['unit_price'],
                'total_amount' => $item['quantity'] * $item['unit_price'],
            ]);

            // Decrease product stock
            Product::find($item['product_id'])->decrement('qty', $item['quantity']);
        }
    }

    private function restockAndDeleteOrderItems(Order $order): void
    {
        foreach ($order->items as $oldItem) {
            Product::where('id', $oldItem->product_id)->increment('qty', $oldItem->quantity);
        }

        $order->items()->delete();
    }

    private function generateUniqueOrderNumber(): string
    {
        return Str::random(10); // Placeholder implementation, you can implement your own logic to generate unique invoice numbers
    }
}
