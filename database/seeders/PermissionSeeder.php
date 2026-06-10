<?php

namespace Database\Seeders;

use App\Models\Tenant;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $permissions = [
            'vendors.view',
            'vendors.create',
            'vendors.edit',
            'vendors.delete',
            'view products',
            'manage products',
            'view customers',
            'manage customers',
            'view orders',
            'manage orders',
            'view invoices',
            'manage coupons',
            'manage settings',
        ];

        foreach ($permissions as $permission) {
            Permission::firstOrCreate(
                ['name' => $permission],
                ['guard_name' => 'web']
            );
        }
    }
}
