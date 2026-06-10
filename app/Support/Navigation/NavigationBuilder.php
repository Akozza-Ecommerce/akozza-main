<?php

namespace App\Support\Navigation;

use App\Models\User;

class NavigationBuilder
{
    public function for(User|null $user): array
    {
        if (!$user) {
            return [];
        }

        if ($user->isPlatformUser()) {
            return AdminNavigation::items();
        }

        return VendorNavigation::items();
    }
}
