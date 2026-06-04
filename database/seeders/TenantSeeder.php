<?php

namespace Database\Seeders;

use App\Models\Tenant;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TenantSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $tenants = [
            ['name' => 'Default Tenant', 'owner_id' => 1],
            ['name' => 'Acme Tenant', 'owner_id' => 1],
            ['name' => 'Spark Tenant', 'owner_id' => 1],
        ];

        foreach ($tenants as $tenant) {
            Tenant::firstOrCreate(
                ['name' => $tenant['name']],
                $tenant
            );
        }
    }
}
