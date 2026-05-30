<?php

use App\Models\Coupon;
use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;

Route::inertia('/', 'welcome', [
    'canRegister' => Features::enabled(Features::registration()),
])->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');

    Route::resource('customers', \App\Http\Controllers\CustomerController::class);
    Route::resource('payment-methods', \App\Http\Controllers\PaymentMethodController::class);
    Route::resource('products', \App\Http\Controllers\ProductController::class);
    Route::resource('coupons', \App\Http\Controllers\CouponController::class);

    Route::resource('orders', \App\Http\Controllers\OrderController::class)->except(['destroy']);

    Route::get('invoices', [\App\Http\Controllers\InvoiceController::class, 'index'])->name('invoices.index');
    Route::get('invoices/{invoice}', [\App\Http\Controllers\InvoiceController::class, 'show'])->name('invoices.show');
});

require __DIR__.'/settings.php';
