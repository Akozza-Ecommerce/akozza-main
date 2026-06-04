<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $products = [
            [
                'barcode' => '880123456789',
                'name' => 'Blue Light Blocking Glasses',
                'cost' => 15.00,
                'price' => 45.00,
                'qty' => 50,
                'is_active' => true,
                'user_id' => 1,
            ],
            [
                'barcode' => '880987654321',
                'name' => 'Classic Aviator Sunglasses',
                'cost' => 20.00,
                'price' => 65.00,
                'qty' => 30,
                'is_active' => true,
                'user_id' => 1,
            ],
            [
                'barcode' => '880555444333',
                'name' => 'Contact Lens Solution 360ml',
                'cost' => 5.50,
                'price' => 12.00,
                'qty' => 100,
                'is_active' => true,
                'user_id' => 1,
            ],
            [
                'barcode' => '880111222333',
                'name' => 'Anti-Fog Microfiber Cloth',
                'cost' => 0.80,
                'price' => 3.50,
                'qty' => 200,
                'is_active' => true,
                'user_id' => 1,
            ],
            [
                'barcode' => '880777888999',
                'name' => 'Reading Glasses +1.50',
                'cost' => 8.00,
                'price' => 25.00,
                'qty' => 40,
                'is_active' => true,
                'user_id' => 1,
            ],
        ];

        foreach ($products as &$product) {
            $category = Category::inRandomOrder()->first();

            $product['category_id'] = $category->id;
            $product['tenant_id'] = $category->tenant_id;
            $product['store_id'] = $category->store_id;
        }

        foreach ($products as $product) {
            \App\Models\Product::create($product);
        }
    }
}
