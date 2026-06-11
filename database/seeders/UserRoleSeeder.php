<?php

namespace Database\Seeders;

use App\Enums\UserType;
use App\Models\User;
use App\Models\Tenant;
use App\Models\Store;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserRoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $adminUser = User::where('type', UserType::PLATFORM_ADMIN)->first();

        if ($adminUser && method_exists($adminUser, 'assignRole')) {
            $adminUser->assignRole('admin');
        }

        $vendorUser = User::where('email', 'vendor@admin.net')->first();
        if ($vendorUser) {
            $tenant = Tenant::first();
            $store = Store::where('tenant_id', $tenant?->id)->first();
            
            $vendorUser->update([
                'active_tenant_id' => $tenant?->id,
                'active_store_id' => $store?->id,
            ]);

            setPermissionsTeamId($tenant?->id);

            if (method_exists($vendorUser, 'assignRole')) {
                $vendorUser->assignRole('vendor');
            }
        }
    }
}
