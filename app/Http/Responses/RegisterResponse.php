<?php

namespace App\Http\Responses;

use Illuminate\Http\JsonResponse;

class RegisterResponse
{
    public function toResponse($request): JsonResponse|\Illuminate\Http\RedirectResponse
    {
        $user = $request->user();

        if ($user->isPlatformUser()) {
            return to_route('admin.dashboard');
        }

        return to_route('vendor.dashboard');
    }
}
