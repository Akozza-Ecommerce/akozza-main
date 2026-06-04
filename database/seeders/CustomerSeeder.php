<?php

namespace Database\Seeders;

use App\Models\Customer;
use App\Models\Store;
use App\Models\Tenant;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CustomerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $tenantIds = Tenant::pluck('id')->toArray();
        $storeIds = Store::pluck('id')->toArray();

        $customers = [
            ['name' => 'John Doe', 'phone_number' => '+1234567890', 'points' => 100, 'user_id' => 1],
            ['name' => 'Jane Smith', 'phone_number' => '+1987654321', 'points' => 250, 'user_id' => 1],
            ['name' => 'Michael Brown', 'phone_number' => '+1122334455', 'points' => 50, 'user_id' => 1],
            ['name' => 'Emily Davis', 'phone_number' => '+1552666777', 'points' => 500, 'user_id' => 1],
            ['name' => 'David Wilson', 'phone_number' => '+1444333222', 'points' => 15, 'user_id' => 1],
        ];

        foreach ($customers as &$customer) {
            $customer['tenant_id'] = $tenantIds[array_rand($tenantIds)];
            $customer['store_id'] = $storeIds[array_rand($storeIds)];
        }

        foreach ($customers as $customer) {
            Customer::firstOrCreate(['tenant_id' => $customer['tenant_id'], 'store_id' => $customer['store_id'], 'phone_number' => $customer['phone_number']], $customer);
        }
    }
}
