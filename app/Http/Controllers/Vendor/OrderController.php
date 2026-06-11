<?php

namespace App\Http\Controllers\Vendor;

use App\Http\Controllers\Controller;
use App\Http\Requests\OrderRequest;
use App\Http\Resources\OrderResource;
use App\Models\Order;
use App\Services\OrderService;
use App\Models\Customer;
use App\Models\PaymentMethod;
use App\Models\Product;
use App\Models\Coupon;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function __construct(protected OrderService $orderService) {}

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $tenantId = $request->user()->active_tenant_id;
        $storeId = $request->user()->active_store_id;

        $orders = Order::where('tenant_id', $tenantId)
            ->where('store_id', $storeId)
            ->with(['customer', 'currentInvoice'])
            ->latest()
            ->paginate(12)
            ->withQueryString();

        return inertia('vendor/orders/index', [
            'orders' => OrderResource::collection($orders)
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        $tenantId = $request->user()->active_tenant_id;
        $storeId = $request->user()->active_store_id;

        return inertia('vendor/orders/create', [
            'customers' => Customer::where('tenant_id', $tenantId)->where('store_id', $storeId)->get(),
            'paymentMethods' => PaymentMethod::where('tenant_id', $tenantId)->where('store_id', $storeId)->active()->get(),
            'products' => Product::where('tenant_id', $tenantId)->where('store_id', $storeId)->active()->get(),
            'coupons' => Coupon::where('tenant_id', $tenantId)->where('store_id', $storeId)->active()->get(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(OrderRequest $request)
    {
        $validated = $request->validated();
        $validated['user_id'] = $request->user()->id;
        $validated['tenant_id'] = $request->user()->active_tenant_id;
        $validated['store_id'] = $request->user()->active_store_id;

        // Ensure each item has the correct tenant/store scoping for nested creates/updates if applicable
        foreach ($validated['items'] as &$item) {
            $item['tenant_id'] = $validated['tenant_id'];
            $item['store_id'] = $validated['store_id'];
        }

        foreach ($validated['payments'] as &$payment) {
            $payment['tenant_id'] = $validated['tenant_id'];
            $payment['store_id'] = $validated['store_id'];
        }

        $this->orderService->createOrder($validated);

        return to_route('vendor.orders.index')->with('success', 'Order created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Order $order)
    {
        $order->load(['customer', 'currentInvoice.payments.paymentMethod', 'currentInvoice.coupon', 'invoices.payments.paymentMethod', 'invoices.coupon', 'items.product', 'user']);
        return inertia('vendor/orders/show', [
            'order' => new OrderResource($order)
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Request $request, Order $order)
    {
        $tenantId = $request->user()->active_tenant_id;
        $storeId = $request->user()->active_store_id;

        $order->load(['customer', 'currentInvoice.payments.paymentMethod', 'currentInvoice.coupon', 'items.product', 'user']);
        return inertia('vendor/orders/edit', [
            'order' => new OrderResource($order),
            'customers' => Customer::where('tenant_id', $tenantId)->where('store_id', $storeId)->get(),
            'paymentMethods' => PaymentMethod::where('tenant_id', $tenantId)->where('store_id', $storeId)->active()->get(),
            'products' => Product::where('tenant_id', $tenantId)->where('store_id', $storeId)->active()->get(),
            'coupons' => Coupon::where('tenant_id', $tenantId)->where('store_id', $storeId)->active()->get(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(OrderRequest $request, Order $order)
    {
        $validated = $request->validated();
        $validated['user_id'] = $request->user()->id;
        $validated['tenant_id'] = $request->user()->active_tenant_id;
        $validated['store_id'] = $request->user()->active_store_id;

        foreach ($validated['items'] as &$item) {
            $item['tenant_id'] = $validated['tenant_id'];
            $item['store_id'] = $validated['store_id'];
        }

        foreach ($validated['payments'] as &$payment) {
            $payment['tenant_id'] = $validated['tenant_id'];
            $payment['store_id'] = $validated['store_id'];
        }

        $this->orderService->updateOrder($order, $validated);

        return to_route('vendor.orders.index')->with('success', 'Order updated successfully.');
    }
}
