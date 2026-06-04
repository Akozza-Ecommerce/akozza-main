<?php

namespace Database\Seeders;

use App\Models\Coupon;
use App\Models\Product;
use App\Models\Category;
use Illuminate\Database\Seeder;

class CouponSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $seedProduct = Product::inRandomOrder()->first();

        if (! $seedProduct) {
            return;
        }

        $tenantId = $seedProduct->tenant_id;
        $storeId = $seedProduct->store_id;

        $productIds = Product::where('tenant_id', $tenantId)
            ->where('store_id', $storeId)
            ->pluck('id')
            ->toArray();

        $categoryIds = Category::where('tenant_id', $tenantId)
            ->where('store_id', $storeId)
            ->pluck('id')
            ->toArray();

        $couponsData = [
            [
                'code' => 'WELCOME10',
                'type' => 'percentage',
                'value' => 10,
                'is_active' => true,
                'start_date' => now(),
                'end_date' => now()->addMonths(6),
                'user_id' => 1,
                'limit' => 10,
                'minimum_invoice_amount' => 100,
                'target' => 'product',
                'days' => ['Monday', 'Wednesday', 'Friday'],
                'target_ids' => array_slice($productIds, 0, 3),
            ],
            [
                'code' => 'FIXED20',
                'type' => 'fixed',
                'value' => 20,
                'is_active' => true,
                'start_date' => now(),
                'end_date' => now()->addMonths(3),
                'user_id' => 1,
                'limit' => 10,
                'minimum_invoice_amount' => 100,
                'target' => 'category',
                'days' => ['Saturday', 'Sunday'],
                'target_ids' => array_slice($categoryIds, 0, 2),
            ],
            [
                'code' => 'SUMMER25',
                'type' => 'percentage',
                'value' => 25,
                'is_active' => true,
                'start_date' => now(),
                'end_date' => now()->addMonths(2),
                'user_id' => 1,
                'limit' => 10,
                'minimum_invoice_amount' => 100,
                'target' => 'product',
                'days' => ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
                'target_ids' => array_slice($productIds, 0, min(3, count($productIds))),
            ],
        ];

        foreach ($couponsData as $data) {
            $data['tenant_id'] = $tenantId;
            $data['store_id'] = $storeId;

            $days = $data['days'] ?? [];
            $targetIds = $data['target_ids'] ?? [];
            $targetType = $data['target'];

            unset($data['days'], $data['target_ids']);

            $coupon = Coupon::create($data);

            foreach ($days as $day) {
                $coupon->days()->create([
                    'tenant_id' => $tenantId,
                    'store_id' => $storeId,
                    'day_of_week' => $day,
                ]);
            }

            foreach ($targetIds as $id) {
                if ($targetType === 'product') {
                    $coupon->targets()->create([
                        'tenant_id' => $tenantId,
                        'store_id' => $storeId,
                        'product_id' => $id,
                    ]);
                } else {
                    $coupon->targets()->create([
                        'tenant_id' => $tenantId,
                        'store_id' => $storeId,
                        'category_id' => $id,
                    ]);
                }
            }
        }
    }
}
