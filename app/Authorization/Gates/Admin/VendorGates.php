<?php

namespace App\Authorization\Gates\Admin;

use App\Models\User;
use Illuminate\Support\Facades\Gate;

class VendorGates
{
    public const GUARD = 'web';

    public static function register(): void
    {
        Gate::define('admin.vendors.view', function (User $user): bool {
            return $user->hasPermissionTo('vendors.view', self::GUARD);
        });

        Gate::define('admin.vendors.create', function (User $user): bool {
            return $user->hasPermissionTo('vendors.create', self::GUARD);
        });

        Gate::define('admin.vendors.edit', function (User $user): bool {
            return $user->hasPermissionTo('vendors.edit', self::GUARD);
        });

        Gate::define('admin.vendors.delete', function (User $user): bool {
            return $user->hasPermissionTo('vendors.delete', self::GUARD);
        });
    }
}
