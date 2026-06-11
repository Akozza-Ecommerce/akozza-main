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


    });


require __DIR__ . '/admin.php';
require __DIR__ . '/vendor.php';
