<?php

namespace Database\Seeders;

use App\Enums\UserType;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = [
            [
                'name' => 'Admin User',
                'type' => UserType::PLATFORM_ADMIN,
                'email' => 'admin@admin.net',
            ],
            [
                'name' => 'vendor User',
                'type' => UserType::DEFAULT,
                'email' => 'vendor@admin.net',
            ],
        ];


        foreach ($users as $user) {
            User::firstOrCreate(
                ['email' => $user['email']],
                [
                    'name' => $user['name'],
                    'username' => generateUniqueIdentifier($user['name']),
                    'type' => $user['type'],
                    'password' => bcrypt('12345678'),
                ]
            );
        }

        // if (method_exists($vendorUser, 'assignRole')) {
        //     $vendorUser->assignRole('vendor');
        // }
    }
}
