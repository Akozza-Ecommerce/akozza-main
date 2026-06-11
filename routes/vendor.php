<?php

use App\Http\Controllers\Vendor\AuthViewsController;
use App\Http\Controllers\Vendor\DashboardController;
use App\Http\Controllers\Vendor\StoreController;
use App\Http\Controllers\Vendor\CategoryController;
use App\Http\Controllers\Vendor\CustomerController;
use App\Http\Controllers\Vendor\ProductController;
use App\Http\Controllers\Vendor\PaymentMethodController;
use App\Http\Controllers\Vendor\OrderController;
use App\Http\Controllers\Vendor\InvoiceController;
use App\Http\Controllers\Vendor\CouponController;
use Illuminate\Support\Facades\Route;
use Laravel\Fortify\RoutePath;

Route::domain(config('app.vendor_dashboard_domain'))->name('vendor.')->group(function () {
    $prefix = 'vendor';
    Route::get('/app', fn() => 'hello Vendor ')->name('vendor');
    Route::middleware(['webauth:vendor', 'verified'])->group(function () {
        Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

        Route::prefix('dashboard')->group(function () {
            Route::resource('stores', StoreController::class);
            Route::resource('categories', CategoryController::class);
            Route::resource('customers', CustomerController::class);
            Route::resource('products', ProductController::class);
            Route::resource('payment-methods', PaymentMethodController::class);
            Route::resource('orders', OrderController::class)->except(['destroy']);
            Route::resource('invoices', InvoiceController::class)->only(['index', 'show']);
            Route::resource('coupons', CouponController::class);
        });
    });

    // Auth routes for vendor
    Route::prefix('')->group(function () {
        Route::get(RoutePath::for('login', '/login'), [AuthViewsController::class, 'login'])
            ->middleware(['webguest:vendor,' . config('fortify.guard')])
            ->name('login');

        Route::get(RoutePath::for('password.request', '/forgot-password'), [AuthViewsController::class, 'forgotPassword'])
            ->middleware(['webguest:vendor,' . config('fortify.guard')])
            ->name('password.request');

        Route::get(RoutePath::for('password.reset', '/reset-password/{token}'), [AuthViewsController::class, 'resetPassword'])
            ->middleware(['webguest:vendor,' . config('fortify.guard')])
            ->name('password.reset');

        Route::get(RoutePath::for('register', '/register'), [AuthViewsController::class, 'register'])
            ->middleware(['webguest:vendor,' . config('fortify.guard')])
            ->name('register');

        Route::get(RoutePath::for('verification.notice', '/email/verify'), [AuthViewsController::class, 'verificationNotice'])
            ->middleware(['webauth:vendor,' . config('fortify.guard')]);
    });
    require __DIR__ . '/auth.php';
    require __DIR__ . '/vendor-settings.php';
});
