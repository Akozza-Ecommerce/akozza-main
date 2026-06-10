<?php

namespace App\Authorization\Gates;

class GateRegistrar
{
    public static function register(): void
    {
        foreach ([
            \App\Authorization\Gates\Admin\VendorGates::class,
        ] as $class) {
            $class::register();
        }
    }
}
