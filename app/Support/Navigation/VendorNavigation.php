<?php

namespace App\Support\Navigation;

class VendorNavigation
{
    public static function items(): array
    {
        return [
            [
                'title' => 'Dashboard',
                'href' => route('vendor.dashboard'),
                'icon' => 'LayoutGrid',
            ],

            [
                'title' => 'Stores',
                'href' => route('vendor.stores.index'),
                'icon' => 'Box',
            ],
        ];
    }
}
