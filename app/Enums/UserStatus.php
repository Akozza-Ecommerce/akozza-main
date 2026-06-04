<?php

namespace App\Enums;

enum UserStatus: string
{
    case ACTIVE = 'active';
    case INACTIVE = 'inactive';
    // case DEFAULT = self::ACTIVE;

    public const DEFAULT = self::ACTIVE;

    public function getLabel(): string
    {
        return match ($this) {
            self::ACTIVE => 'Active',
            self::INACTIVE => 'Inactive',
            // self::DEFAULT => $this->getLabel(self::ACTIVE),
        };
    }
}
