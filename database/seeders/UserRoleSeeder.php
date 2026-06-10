<?php

namespace Database\Seeders;

use App\Enums\UserType;
use App\Models\User;
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

        if (method_exists($adminUser, 'assignRole')) {
            $adminUser->assignRole('admin');
        }
    }
}
