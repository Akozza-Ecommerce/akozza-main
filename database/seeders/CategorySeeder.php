<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
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

        Category::insert($categories);
    }
}
