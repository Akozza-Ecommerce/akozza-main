<?php

namespace App\Enums;

enum UserType: string
{
    case PLATFORM_ADMIN = 'platform_admin';
    case PLATFORM_STAFF = 'platform_staff';
    case VENDOR = 'vendor';

    public const DEFAULT = self::VENDOR;

    public function getLabel(): string
    {
        return match ($this) {
            self::PLATFORM_ADMIN => 'Platform Admin',
            self::PLATFORM_STAFF => 'Platform Staff',
            self::VENDOR => 'Vendor',
        };
    }
}
