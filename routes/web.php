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
    Route::resource('invoices', \App\Http\Controllers\InvoiceController::class)->except(['destroy']);
    Route::resource('orders', \App\Http\Controllers\OrderController::class)->except(['destroy']);
    Route::resource('prescriptions', \App\Http\Controllers\PrescriptionController::class);
});

require __DIR__.'/settings.php';
