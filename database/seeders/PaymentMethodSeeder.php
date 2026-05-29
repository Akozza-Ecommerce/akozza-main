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
        $methods = [
            ['name' => 'Cash', 'is_default' => true, 'is_active' => true, 'user_id' => 1],
            ['name' => 'Credit Card', 'is_default' => false, 'is_active' => true, 'user_id' => 1],
            ['name' => 'Bank Transfer', 'is_default' => false, 'is_active' => true, 'user_id' => 1],
            ['name' => 'Store Credit', 'is_default' => false, 'is_active' => true, 'user_id' => 1],
        ];

        foreach ($methods as $method) {
            \App\Models\PaymentMethod::create($method);
        }
    }
}
