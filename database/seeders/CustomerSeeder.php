<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CustomerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $customers = [
            ['name' => 'John Doe', 'phone_number' => '+1234567890', 'points' => 100, 'user_id' => 1],
            ['name' => 'Jane Smith', 'phone_number' => '+1987654321', 'points' => 250, 'user_id' => 1],
            ['name' => 'Michael Brown', 'phone_number' => '+1122334455', 'points' => 50, 'user_id' => 1],
            ['name' => 'Emily Davis', 'phone_number' => '+1555666777', 'points' => 500, 'user_id' => 1],
            ['name' => 'David Wilson', 'phone_number' => '+1444333222', 'points' => 15, 'user_id' => 1],
        ];

        foreach ($customers as $customer) {
            \App\Models\Customer::create($customer);
        }
    }
}
