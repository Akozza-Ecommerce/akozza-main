<?php

namespace App\Http\Responses;

use Illuminate\Http\JsonResponse;
use Laravel\Fortify\Contracts\LoginResponse as LoginResponseContract;

class LoginResponse implements LoginResponseContract
{
    public function toResponse($request): JsonResponse|\Illuminate\Http\RedirectResponse
    {
        $host = $request->getHost();

        if (str_contains($host, 'admin.')) {
            return to_route('admin.dashboard');
        }

        return to_route('vendor.dashboard');
    }
}