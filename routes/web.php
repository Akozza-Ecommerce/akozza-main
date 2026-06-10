<?php

use App\Enums\UserStatus;
use App\Models\Coupon;
use App\Models\Tenant;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;

Route::get('/test', function () {
    // return redirect()->route('admin');
    return Auth::user() ? Auth::user()->permissions : 'No user';
});

Route::domain(config('app.root_domain'))
    ->group(function () {

        Route::inertia('/', 'welcome', [
            'canRegister' => Features::enabled(Features::registration()),
        ])->name('home');


        Route::middleware(['guest', 'verified'])->group(function () {

            Route::resource('customers', \App\Http\Controllers\CustomerController::class);
            Route::resource('payment-methods', \App\Http\Controllers\PaymentMethodController::class);
            Route::resource('products', \App\Http\Controllers\ProductController::class);
            Route::resource('coupons', \App\Http\Controllers\CouponController::class);

            Route::resource('orders', \App\Http\Controllers\OrderController::class)->except(['destroy']);

            Route::get('invoices', [\App\Http\Controllers\InvoiceController::class, 'index'])->name('invoices.index');
            Route::get('invoices/{invoice}', [\App\Http\Controllers\InvoiceController::class, 'show'])->name('invoices.show');
        });
    });


require __DIR__ . '/admin.php';
require __DIR__ . '/vendor.php';
