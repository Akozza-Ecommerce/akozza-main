<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class SetSessionDomain
{
    public function handle(Request $request, Closure $next): Response
    {
        $host = $request->getHost();

        if (str_contains($host, 'admin.')) {
            config(['session.cookie' => 'platform_session']);
            config(['session.domain' => config('app.admin_session_domain')]);
        }

        if (str_contains($host, 'app.')) {
            config(['session.cookie' => 'vendor_session']);
            config(['session.domain' => config('app.vendor_session_domain')]);
        }

        return $next($request);
    }
}
