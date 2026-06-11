<?php

namespace Database\Seeders;

use App\Models\Store;
use App\Models\Tenant;
use Illuminate\Database\Seeder;

class StoreSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        foreach ([1, 2, 3] as $storeId) {
            Store::firstOrCreate(
                ['tenant_id' => Tenant::inRandomOrder()->first()->id],
                [
                    'name' => "Store $storeId",
                    'slug' => "store-$storeId",
                    'description' => "Description for store $storeId",
                ]
            );
        }
    }
}
