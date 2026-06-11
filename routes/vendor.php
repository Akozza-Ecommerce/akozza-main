<?php

use App\Http\Controllers\Vendor\AuthViewsController;
use App\Http\Controllers\Vendor\DashboardController;
use App\Http\Controllers\Vendor\StoreController;
use Illuminate\Support\Facades\Route;
use Laravel\Fortify\RoutePath;

Route::domain(config('app.vendor_dashboard_domain'))->name('vendor.')->group(function () {
    $prefix = 'vendor';
    Route::get('/app', fn() => 'hello Vendor ')->name('vendor');
    Route::middleware(['webauth:vendor', 'verified'])->group(function () {
        Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

        Route::prefix('dashboard')->group(function () {
            Route::resource('stores', StoreController::class);
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
