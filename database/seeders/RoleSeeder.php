<?php

namespace Database\Seeders;

use App\Models\Tenant;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $tenantId = Tenant::first()->id;

        $roles = [
            'admin' => [
                ...Permission::pluck('name')->toArray(),
            ],
            'vendor' => [
                'view products',
                'manage products',
                'view customers',
                'manage customers',
                'view orders',
                'manage orders',
                'view invoices',
            ],
            'cashier' => [
                'view products',
                'view customers',
                'view orders',
                'manage orders',
            ],
        ];

        foreach ($roles as $roleName => $permissions) {
            $role = Role::firstOrCreate(
                ['name' => $roleName, 'tenant_id' => $roleName === 'admin' ? null : $tenantId],
                ['guard_name' => 'web']
            );

            $role->syncPermissions($permissions);
        }
    }
}
