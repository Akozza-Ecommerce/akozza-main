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
        // Create test user if not exists
        User::firstOrCreate(
            ['email' => 'admin@admin.net'],
            [
                'name' => 'Admin User',
                'password' => bcrypt('12345678'),
            ]
        );

        $this->call([
            CategorySeeder::class,
            CustomerSeeder::class,
            ProductSeeder::class,
            PaymentMethodSeeder::class,
            CouponSeeder::class,
            PrescriptionSeeder::class,
        ]);
    }
}
