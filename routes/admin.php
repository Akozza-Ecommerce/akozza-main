<?php

use App\Http\Controllers\Admin\AuthViewsController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\VendorController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Laravel\Fortify\RoutePath;


Route::domain(config('app.admin_dashboard_domain'))->name('admin.')->group(function () {
    $prefix = 'admin';
    Route::get('/test', function () {
        // return redirect()->route('admin');
        return Auth::user() ? Auth::user()->getAllPermissions() : 'No user';
    });
    Route::middleware(['webauth:admin', 'verified'])->group(function () {
        Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

        Route::prefix('dashboard')->group(function () {
            Route::resource('vendors', VendorController::class);
        });
    });

    // Auth routes for admin
    Route::prefix('')->group(function () {
        Route::get(RoutePath::for('login', '/login'), [AuthViewsController::class, 'login'])
            ->middleware(['webguest:admin,' . config('fortify.guard')])
            ->name('login');

        Route::get(RoutePath::for('password.request', '/forgot-password'), [AuthViewsController::class, 'forgotPassword'])
            ->middleware(['webguest:admin,' . config('fortify.guard')])
            ->name('password.request');

        Route::get(RoutePath::for('password.reset', '/reset-password/{token}'), [AuthViewsController::class, 'resetPassword'])
            ->middleware(['webguest:admin,' . config('fortify.guard')])
            ->name('password.reset');

        Route::get(RoutePath::for('register', '/register'), [AuthViewsController::class, 'register'])
            ->middleware(['webguest:admin,' . config('fortify.guard')])
            ->name('register');

        Route::get(RoutePath::for('verification.notice', '/email/verify'), [AuthViewsController::class, 'verificationNotice'])
            ->middleware(['webauth:admin,' . config('fortify.guard')])
            ->name('verification.notice');
    });

    require __DIR__ . '/auth.php';
    require __DIR__ . '/admin-settings.php';
});
