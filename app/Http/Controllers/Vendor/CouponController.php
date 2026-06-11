<?php

namespace App\Http\Controllers\Vendor;

use App\Http\Controllers\Controller;
use App\Http\Requests\CouponRequest;
use App\Http\Resources\CouponResource;
use App\Models\Coupon;
use App\Services\CouponService;
use App\Models\Product;
use App\Models\Category;
use Illuminate\Http\Request;

class CouponController extends Controller
{
    public function __construct(protected CouponService $couponService) {}
    
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $tenantId = $request->user()->active_tenant_id;
        $storeId = $request->user()->active_store_id;

        $coupons = Coupon::where('tenant_id', $tenantId)
            ->where('store_id', $storeId)
            ->latest()
            ->paginate(12)
            ->withQueryString();

        return inertia('vendor/coupons/index', [
            'coupons' => CouponResource::collection($coupons)
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        $tenantId = $request->user()->active_tenant_id;
        $storeId = $request->user()->active_store_id;

        return inertia('vendor/coupons/create', [
            'products' => Product::where('tenant_id', $tenantId)->where('store_id', $storeId)->active()->get(),
            'categories' => Category::where('tenant_id', $tenantId)->where('store_id', $storeId)->active()->get(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CouponRequest $request)
    {
        $data = $request->validated();
        $data['user_id'] = $request->user()->id;
        $data['tenant_id'] = $request->user()->active_tenant_id;
        $data['store_id'] = $request->user()->active_store_id;

        $coupon = Coupon::create($data);

        if ($request->has('days')) {
            $this->couponService->saveCouponDays($coupon, $request->days);
        }

        if ($request->has('target_ids')) {
            $this->couponService->saveCouponTargets($coupon, $request->target_ids);
        }

        return to_route('vendor.coupons.index')->with('success', 'Coupon created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Coupon $coupon)
    {
        $coupon->load(['days', 'targets.product', 'targets.category']);
        return inertia('vendor/coupons/show', [
            'coupon' => new CouponResource($coupon)
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Request $request, Coupon $coupon)
    {
        $tenantId = $request->user()->active_tenant_id;
        $storeId = $request->user()->active_store_id;

        $coupon->load(['days', 'targets']);
        return inertia('vendor/coupons/edit', [
            'coupon' => new CouponResource($coupon),
            'products' => Product::where('tenant_id', $tenantId)->where('store_id', $storeId)->active()->get(),
            'categories' => Category::where('tenant_id', $tenantId)->where('store_id', $storeId)->active()->get(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(CouponRequest $request, Coupon $coupon)
    {
        $data = $request->validated();

        $coupon->update($data);

        if ($request->has('days')) {
            $this->couponService->saveCouponDays($coupon, $request->days);
        }

        if ($request->has('target_ids')) {
            $this->couponService->saveCouponTargets($coupon, $request->target_ids);
        }

        return to_route('vendor.coupons.index')->with('success', 'Coupon updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Coupon $coupon)
    {
        $coupon->delete();

        return to_route('vendor.coupons.index')->with('success', 'Coupon deleted successfully.');
    }
}
