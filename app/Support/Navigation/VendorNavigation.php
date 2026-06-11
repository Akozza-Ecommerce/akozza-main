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

            [
                'title' => 'Categories',
                'href' => route('vendor.categories.index'),
                'icon' => 'Layers',
            ],

            [
                'title' => 'Products',
                'href' => route('vendor.products.index'),
                'icon' => 'Package',
            ],

            [
                'title' => 'Customers',
                'href' => route('vendor.customers.index'),
                'icon' => 'Users',
            ],

            [
                'title' => 'Orders',
                'href' => route('vendor.orders.index'),
                'icon' => 'ShoppingCart',
            ],

            [
                'title' => 'Invoices',
                'href' => route('vendor.invoices.index'),
                'icon' => 'FileText',
            ],

            [
                'title' => 'Payment Methods',
                'href' => route('vendor.payment-methods.index'),
                'icon' => 'CreditCard',
            ],

            [
                'title' => 'Coupons',
                'href' => route('vendor.coupons.index'),
                'icon' => 'Ticket',
            ],
        ];
    }
}
