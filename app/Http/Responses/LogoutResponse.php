<?php

namespace App\Http\Responses;

use Illuminate\Http\JsonResponse;
use Laravel\Fortify\Contracts\LogoutResponse as ContractsLogoutResponse;

class LogoutResponse implements ContractsLogoutResponse
{
    public function toResponse($request): JsonResponse|\Illuminate\Http\RedirectResponse
    {
        $host = $request->getHost();

        if (str_contains($host, 'admin.')) {
            return to_route('admin.login');
        }

        return to_route('vendor.login');
    }
}
