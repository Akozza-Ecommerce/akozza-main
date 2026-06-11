<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PaymentMethodSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $tenantId = \App\Models\Tenant::first()->id;
        $storeId = \App\Models\Store::where('tenant_id', $tenantId)->first()->id;

        $methods = [
            ['name' => 'Cash', 'is_default' => true, 'is_active' => true, 'user_id' => 1, 'tenant_id' => $tenantId, 'store_id' => $storeId],
            ['name' => 'Credit Card', 'is_default' => false, 'is_active' => true, 'user_id' => 1, 'tenant_id' => $tenantId, 'store_id' => $storeId],
            ['name' => 'Bank Transfer', 'is_default' => false, 'is_active' => true, 'user_id' => 1, 'tenant_id' => $tenantId, 'store_id' => $storeId],
            ['name' => 'Store Credit', 'is_default' => false, 'is_active' => true, 'user_id' => 1, 'tenant_id' => $tenantId, 'store_id' => $storeId],
        ];

        foreach ($methods as $method) {
            \App\Models\PaymentMethod::create($method);
        }
    }
}
