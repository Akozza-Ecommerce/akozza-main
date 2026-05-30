<?php

namespace App\Http\Controllers;

use App\Http\Requests\OrderRequest;
use App\Http\Resources\OrderResource;
use App\Models\Order;
use App\Services\OrderService;
use App\Models\Customer;
use App\Models\PaymentMethod;
use App\Models\Product;
use App\Models\Coupon;
use Inertia\Inertia;

class OrderController extends Controller
{
    public function __construct(protected OrderService $orderService) {}

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $orders = OrderResource::collection(Order::with(['customer', 'currentInvoice'])->latest()->paginate(12)->withQueryString());
        return Inertia::render('orders/index', [
            'orders' => $orders
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('orders/create', [
            'customers' => Customer::all(),
            'paymentMethods' => PaymentMethod::active()->get(),
            'products' => Product::active()->get(),
            'coupons' => Coupon::active()->get(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(OrderRequest $request)
    {
        $validated = $request->validated();
        $validated['user_id'] = $request->user()->id;

        $this->orderService->createOrder($validated);

        return redirect()->route('orders.index')->with('success', 'Order created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Order $order)
    {
        $order->load(['customer', 'currentInvoice.payments.paymentMethod', 'currentInvoice.coupon', 'invoices.payments.paymentMethod', 'invoices.coupon', 'items.product', 'user']);
        return Inertia::render('orders/show', [
            'order' => new OrderResource($order)
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Order $order)
    {
        $order->load(['customer', 'currentInvoice.payments.paymentMethod', 'currentInvoice.coupon', 'items.product', 'user']);
        return Inertia::render('orders/edit', [
            'order' => new OrderResource($order),
            'customers' => Customer::all(),
            'paymentMethods' => PaymentMethod::active()->get(),
            'products' => Product::active()->get(),
            'coupons' => Coupon::active()->get(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(OrderRequest $request, Order $order)
    {
        // dd($request->all());
        $validated = $request->validated();
        $validated['user_id'] = $request->user()->id;

        $this->orderService->updateOrder($order, $validated);

        return redirect()->route('orders.index')->with('success', 'Order updated successfully.');
    }
}
