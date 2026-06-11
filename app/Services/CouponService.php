<?php

namespace App\Services;

use App\Models\Coupon;
use App\Models\Product;
use Exception;

class CouponService
{
    /**
     * Create a new class instance.
     */
    public function __construct(protected Coupon $coupon) {}

    public function saveCouponDays(Coupon $coupon, array $days): void
    {
        if (empty($days)) {
            return;
        }
        if ($coupon->days()->count() > 0) {
            $coupon->days()->delete();
        }
        foreach ($days as $day) {
            $coupon->days()->create([
                'day_of_week' => $day,
                'tenant_id' => $coupon->tenant_id,
                'store_id' => $coupon->store_id,
            ]);
        }
    }

    public function saveCouponTargets(Coupon $coupon, array $targetIds): void
    {
        if (empty($targetIds)) {
            return;
        }
        if ($coupon->targets()->count() > 0) {
            $coupon->targets()->delete();
        }
        
        foreach ($targetIds as $id) {
            if ($coupon->target === 'product') {
                $coupon->targets()->create([
                    'product_id' => $id,
                    'tenant_id' => $coupon->tenant_id,
                    'store_id' => $coupon->store_id,
                ]);
            } else {
                $coupon->targets()->create([
                    'category_id' => $id,
                    'tenant_id' => $coupon->tenant_id,
                    'store_id' => $coupon->store_id,
                ]);
            }
        }
    }

    public function applyCoupon(int $couponId, array $items, float $subtotalAmount, $discountAmount = 0): mixed
    {
        $coupon = $this->setCouponById($couponId);
        if (!$coupon) {
            return throw new Exception("Coupon not found.");
        }

        if (!$this->isCouponValidForToday($couponId)) {
            return throw new Exception("The selected coupon cannot be applied, it is not valid for today.");
        }

        if (!$this->isCouponValidForTargets($couponId, $items)) {
            return throw new Exception("The selected coupon cannot be applied to the items in the invoice.");
        }

        $amountToApplyCoupon = $subtotalAmount - $discountAmount;
        $couponAmount = $coupon->type === 'percentage' ? $amountToApplyCoupon * ($coupon->value / 100) : $coupon->value;

        if ($couponAmount > $amountToApplyCoupon) {
            return throw new Exception("The coupon amount cannot exceed the amount to which it can be applied.");
        }

        $coupon->decrement('limit', 1);

        return $couponAmount;
    }

    protected function setCouponById(int $couponId): ?Coupon
    {
        if (!$this->coupon || $this->coupon->id !== $couponId) {
            return Coupon::with('days', 'targets')->find($couponId);
        }

        return $this->coupon;
    }

    public function isCouponValidForToday(int $couponId): bool
    {
        $coupon = $this->setCouponById($couponId);
        if (!$coupon) {
            return false;
        }
        return $coupon && $coupon->days->pluck('day_of_week')->contains(today()->dayName); // Placeholder return value
    }

    public function isCouponValidForTargets(int $couponId, array $items): bool
    {
        $coupon = $this->setCouponById($couponId);
        if (!$coupon) {
            return false;
        }
        if ($coupon->targets->count() === 0) {
            return true; // No specific targets, so it's valid for all
        }

        if ($coupon->target === 'product') {
            $productIds = array_column($items, 'product_id');
            $allowedIds = $coupon->targets->pluck('product_id')->toArray();
            $unallowedItems = array_diff($productIds, $allowedIds);
            return empty($unallowedItems);
        } else {
            $productIds = array_column($items, 'product_id');
            $categoryIds = Product::whereIn('id', $productIds)->pluck('category_id')->toArray();
            $allowedCategoryIds = $coupon->targets->pluck('category_id')->toArray();
            $unallowedCategories = array_diff($categoryIds, $allowedCategoryIds);
            return empty($unallowedCategories);
        }
    }
}
