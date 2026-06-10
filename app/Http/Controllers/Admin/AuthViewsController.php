<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Validation\Rules\Password;
use Laravel\Fortify\Features;

class AuthViewsController extends Controller
{
    public function login(Request $request)
    {
        return inertia('admin/auth/login', [
            'canResetPassword' => Features::enabled(Features::resetPasswords()),
            'canRegister' => Features::enabled(Features::registration()),
            'status' => $request->session()->get('status'),
        ]);
    }

    public function register()
    {
        return inertia('admin/auth/register', [
            'passwordRules' => Password::defaults()->toPasswordRulesString(),
        ]);
    }

    public function forgotPassword(Request $request)
    {
        return inertia('admin/auth/forgot-password', [
            'status' => $request->session()->get('status'),
        ]);
    }

    public function resetPassword(Request $request)
    {
        return inertia('admin/auth/reset-password', [
            'email' => $request->email,
            'token' => $request->route('token'),
            'passwordRules' => Password::defaults()->toPasswordRulesString(),
        ]);
    }

    public function verificationNotice(Request $request)
    {
        return inertia('admin/auth/verification-notice', [
            'status' => $request->session()->get('status'),
        ]);
    }
}
