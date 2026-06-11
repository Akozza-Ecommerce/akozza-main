<?php

namespace App\Http\Controllers\Vendor;

use App\Http\Controllers\Controller;
use App\Http\Requests\PaymentMethodRequest;
use App\Http\Resources\PaymentMethodResource;
use App\Models\PaymentMethod;
use Illuminate\Http\Request;

class PaymentMethodController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $tenantId = $request->user()->active_tenant_id;
        $storeId = $request->user()->active_store_id;

        $paymentMethods = PaymentMethod::where('tenant_id', $tenantId)
            ->where('store_id', $storeId)
            ->latest()
            ->paginate(12)
            ->withQueryString();

        return inertia('vendor/payment-methods/index', [
            'paymentMethods' => PaymentMethodResource::collection($paymentMethods)
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('vendor/payment-methods/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(PaymentMethodRequest $request)
    {
        $data = $request->validated();
        $data['user_id'] = $request->user()->id;
        $data['tenant_id'] = $request->user()->active_tenant_id;
        $data['store_id'] = $request->user()->active_store_id;

        PaymentMethod::create($data);

        return to_route('vendor.payment-methods.index')->with('success', 'Payment method created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(PaymentMethod $paymentMethod)
    {
        return inertia('vendor/payment-methods/show', [
            'paymentMethod' => new PaymentMethodResource($paymentMethod)
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(PaymentMethod $paymentMethod)
    {
        return inertia('vendor/payment-methods/edit', [
            'paymentMethod' => new PaymentMethodResource($paymentMethod)
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(PaymentMethodRequest $request, PaymentMethod $paymentMethod)
    {
        $data = $request->validated();

        $paymentMethod->update($data);

        return to_route('vendor.payment-methods.index')->with('success', 'Payment method updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(PaymentMethod $paymentMethod)
    {
        $paymentMethod->delete();

        return to_route('vendor.payment-methods.index')->with('success', 'Payment method deleted successfully.');
    }
}
