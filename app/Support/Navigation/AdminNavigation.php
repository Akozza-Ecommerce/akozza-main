<?php

namespace App\Support\Navigation;

class AdminNavigation
{
    public static function items(): array
    {
        return [
            [
                'title' => 'Dashboard',
                'href' => route('admin.dashboard'),
                'icon' => 'LayoutGrid',
            ],
            [
                'title' => 'Vendors',
                'href' => route('admin.vendors.index'),
                'icon' => 'Users',
            ],
            [
                'title' => 'Tenants',
                'href' => route('admin.tenants.index'),
                'icon' => 'Users',
            ],
        ];
    }
}
