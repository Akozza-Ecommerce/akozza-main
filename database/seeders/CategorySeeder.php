<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Store;
use App\Models\Tenant;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $tenantIds = Tenant::pluck('id')->toArray();
        $storeIds = Store::pluck('id')->toArray();

        $categories = [
            ['name' => 'Electronics', 'is_active' => true],
            ['name' => 'Clothing', 'is_active' => true],
            ['name' => 'Books', 'is_active' => true],
            ['name' => 'Toys', 'is_active' => true],
            ['name' => 'Furniture', 'is_active' => true],
            ['name' => 'Sports Equipment', 'is_active' => true],
            ['name' => 'Home Decor', 'is_active' => true],
            ['name' => 'Kitchenware', 'is_active' => true],
            ['name' => 'Beauty Products', 'is_active' => true],
            ['name' => 'Health and Wellness', 'is_active' => true],
            ['name' => 'Office Supplies', 'is_active' => true],
            ['name' => 'Pet Supplies', 'is_active' => true],
            ['name' => 'Baby Products', 'is_active' => true],
            ['name' => 'Automotive', 'is_active' => true],
            ['name' => 'Jewelry', 'is_active' => true],
            ['name' => 'Shoes', 'is_active' => true],
            ['name' => 'Accessories', 'is_active' => true],
            ['name' => 'Gardening', 'is_active' => true],
            ['name' => 'Musical Instruments', 'is_active' => true],
            ['name' => 'Camera and Photography', 'is_active' => true],
        ];

        foreach ($categories as &$category) {
            $category['tenant_id'] = $tenantIds[array_rand($tenantIds)];
            $category['store_id'] = $storeIds[array_rand($storeIds)];
        }

        Category::insert($categories);
    }
}
