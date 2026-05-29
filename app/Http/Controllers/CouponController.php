<?php

namespace App\Http\Controllers;

use App\Http\Requests\CouponRequest;
use App\Http\Resources\CouponResource;
use App\Models\Coupon;
use App\Services\CouponService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CouponController extends Controller
{
    public function __construct(protected CouponService $couponService) {}
    
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $coupons = CouponResource::collection(Coupon::latest()->paginate(12)->withQueryString());
        return Inertia::render('coupons/index', [
            'coupons' => $coupons
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('coupons/create', [
            'products' => \App\Models\Product::active()->get(),
            'categories' => \App\Models\Category::active()->get(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CouponRequest $request)
    {
        $data = $request->validated();

        $data['user_id'] = $request->user()->id ?? 1;

        $coupon = Coupon::create($data);

        if ($request->has('days')) {
            $this->couponService->saveCouponDays($coupon, $request->days);
        }

        if ($request->has('target_ids')) {
            $this->couponService->saveCouponTargets($coupon, $request->target_ids);
        }

        return redirect()->route('coupons.index')->with('success', 'Coupon created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Coupon $coupon)
    {
        $coupon->load(['days', 'targets.product', 'targets.category']);
        return Inertia::render('coupons/show', [
            'coupon' => new CouponResource($coupon)
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Coupon $coupon)
    {
        $coupon->load(['days', 'targets']);
        return Inertia::render('coupons/edit', [
            'coupon' => new CouponResource($coupon),
            'products' => \App\Models\Product::active()->get(),
            'categories' => \App\Models\Category::active()->get(),
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

        return redirect()->route('coupons.index')->with('success', 'Coupon updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Coupon $coupon)
    {
        $coupon->delete();

        return redirect()->route('coupons.index')->with('success', 'Coupon deleted successfully.');
    }
}
