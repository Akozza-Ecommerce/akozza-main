<?php

namespace App\Authorization\Gates\Admin;

use App\Models\User;
use Illuminate\Support\Facades\Gate;

class TenantGates
{
    public const GUARD = 'web';

    public static function register(): void
    {
        Gate::define('admin.tenants.view', function (User $user): bool {
            return $user->hasPermissionTo('tenants.view', self::GUARD);
        });

        Gate::define('admin.tenants.create', function (User $user): bool {
            return $user->hasPermissionTo('tenants.create', self::GUARD);
        });

        Gate::define('admin.tenants.edit', function (User $user): bool {
            return $user->hasPermissionTo('tenants.edit', self::GUARD);
        });

        Gate::define('admin.tenants.delete', function (User $user): bool {
            return $user->hasPermissionTo('tenants.delete', self::GUARD);
        });
    }
}
