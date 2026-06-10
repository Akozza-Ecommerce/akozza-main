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

            // [
            //     'title' => 'Vendors',
            //     'href' => route('vendors.index'),
            //     'icon' => 'Users',
            // ],
        ];
    }
}
