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

class InvoiceService
{
    /**
     * Create a new class instance.
     */
    public function __construct(protected CouponService $couponService) {}

    public function createInvoice(Order $order, array $data)
    {
        $amounts = $this->calculateAmounts($data['items'], $data['subtotal'], $data['discount_amount'], $data['coupon_id'] ?? null);
        $paidAmount = array_sum(array_column($data['payments'], 'amount'));
        $invoiceStatus = $this->checkInvoiceStatus($order, $amounts['totalAmount'], $paidAmount);

        if ($paidAmount > $amounts['totalAmount']) {
            return throw new Exception('You can not pay more than the total amount');
        }

        if ($order->invoices()->exists()) {
            $order->invoices()->where('status', '!=', InvoiceStatus::REPLACED)->update(['status' => InvoiceStatus::REPLACED]);
        }

        DB::transaction(function () use ($data, $amounts, $order, $invoiceStatus, $paidAmount) {
            $invoice = Invoice::create([
                'user_id' => $data['user_id'] ?? 1,
                'order_id' => $order->id,
                'customer_id' => $data['customer_id'],
                'number' => $this->generateUniqueInvoiceNumber(),
                'coupon_id' => $data['coupon_id'] ?? null,
                'date' => $data['date'],
                'discount_amount' => $amounts['discountAmount'],
                'subtotal' => $data['subtotal'],
                'coupon_amount' => $amounts['couponAmount'],
                'tax_amount' => $amounts['taxAmount'],
                'tax_rate' => '0.1',
                'total_amount' => $amounts['totalAmount'],
                'paid_amount' => $paidAmount,
                'due_amount' => $amounts['totalAmount'] - $paidAmount,
                'status' => $invoiceStatus,
                'notes' => $data['notes'] ?? null,
            ]);

            $this->storeInvoicePayments($invoice, $data['payments']);
        });
    }

    private function calculateAmounts(array $items, $subtotalAmount, $discountAmount, ?int $couponId = null): array
    {
        if ($discountAmount > $subtotalAmount) {
            throw new \Exception("Discount amount cannot exceed subtotal amount.");
        }
        $couponAmount = $couponId ? $this->couponService->applyCoupon($couponId, $items, $subtotalAmount, $discountAmount) : 0;
        $taxAmount = ($subtotalAmount - $discountAmount - $couponAmount) * 0.1; // Fixed 10% tax
        $totalAmount = $subtotalAmount - $discountAmount - $couponAmount + $taxAmount;

        return compact('subtotalAmount', 'discountAmount', 'couponAmount', 'taxAmount', 'totalAmount');
    }

    private function checkInvoiceStatus(Order $order, float $totalAmount, float $paidAmount): InvoiceStatus
    {
        if ($paidAmount === $totalAmount) {
            $order->update(['status' => OrderStatus::COMPLETED]);
            return InvoiceStatus::PAID;
        } elseif ($paidAmount > 0) {
            return InvoiceStatus::PARTIALLY_PAID;
        } else {
            return InvoiceStatus::UNPAID;
        }
    }

    private function storeInvoicePayments(Invoice $invoice, array $payments): void
    {
        $paymentsData = [];
        foreach ($payments as $payment) {
            if ($payment['amount'] <= 0) {
                continue; // Skip zero or negative payments
            }
            $paymentsData[] = [
                'payment_method_id' => $payment['payment_method_id'],
                'amount' => $payment['amount'],
                'paid_date' => now(),
                'status' => InvoicePaymentStatus::Paid,
            ];
        }

        $invoice->payments()->createMany($paymentsData);
    }

    private function generateUniqueInvoiceNumber(): string
    {
        return Str::random(10); // Placeholder implementation, you can implement your own logic to generate unique invoice numbers
    }
}
