<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $adminUser = User::firstOrCreate(
            ['email' => 'admin@admin.net'],
            [
                'name' => 'Admin User',
                'password' => bcrypt('12345678'),
            ]
        );

        $vendorUser = User::firstOrCreate(
            ['email' => 'vendor@admin.net'],
            [
                'name' => 'Vendor User',
                'password' => bcrypt('12345678'),
            ]
        );

        User::firstOrCreate(
            ['email' => 'cashier@admin.net'],
            [
                'name' => 'Cashier User',
                'password' => bcrypt('12345678'),
            ]
        );

        $this->call([
            StoreSeeder::class,
            TenantSeeder::class,
            PermissionSeeder::class,
            RoleSeeder::class,
            CategorySeeder::class,
            CustomerSeeder::class,
            ProductSeeder::class,
            PaymentMethodSeeder::class,
            CouponSeeder::class,
        ]);

        if (method_exists($adminUser, 'assignRole')) {
            $adminUser->assignRole('admin');
        }
        if (method_exists($vendorUser, 'assignRole')) {
            $vendorUser->assignRole('vendor');
        }
    }
}
