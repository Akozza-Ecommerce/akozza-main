<?php

namespace App\Providers;

use App\Actions\Fortify\CreateNewUser;
use App\Actions\Fortify\ResetUserPassword;
use App\Http\Responses\LoginResponse;
use App\Http\Responses\LogoutResponse;
use App\Http\Responses\RegisterResponse;
use App\Models\User;
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Str;
use Illuminate\Validation\Rules\Password;
use Inertia\Inertia;
use Laravel\Fortify\Features;
use Laravel\Fortify\Fortify;
use Laravel\Fortify\Contracts\LoginResponse as LoginResponseContract;
use Laravel\Fortify\Contracts\LogoutResponse as ContractsLogoutResponse;
use Laravel\Fortify\Contracts\RegisterResponse as RegisterResponseContract;


class FortifyServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        Fortify::ignoreRoutes();
        $this->app->singleton(
            LoginResponseContract::class,
            LoginResponse::class
        );
        $this->app->singleton(
            RegisterResponseContract::class,
            RegisterResponse::class
        );
        $this->app->singleton(
            ContractsLogoutResponse::class,
            LogoutResponse::class
        );
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        $this->configureActions();
        // $this->configureViews();
        $this->configureRateLimiting();
        $this->configureAuthLogic();
    }

    /**
     * Configure Fortify actions.
     */
    private function configureActions(): void
    {
        Fortify::resetUserPasswordsUsing(ResetUserPassword::class);
        Fortify::createUsersUsing(CreateNewUser::class);
    }

    /**
     * Configure Fortify views.
     */
    private function configureViews(): void
    {
        Fortify::loginView(fn(Request $request) => Inertia::render('auth/login', [
            'canResetPassword' => Features::enabled(Features::resetPasswords()),
            'canRegister' => Features::enabled(Features::registration()),
            'status' => $request->session()->get('status'),
        ]));

        Fortify::resetPasswordView(fn(Request $request) => Inertia::render('auth/reset-password', [
            'email' => $request->email,
            'token' => $request->route('token'),
            'passwordRules' => Password::defaults()->toPasswordRulesString(),
        ]));

        Fortify::requestPasswordResetLinkView(fn(Request $request) => Inertia::render('auth/forgot-password', [
            'status' => $request->session()->get('status'),
        ]));

        Fortify::verifyEmailView(fn(Request $request) => Inertia::render('auth/verify-email', [
            'status' => $request->session()->get('status'),
        ]));

        Fortify::registerView(fn() => Inertia::render('auth/register', [
            'passwordRules' => Password::defaults()->toPasswordRulesString(),
        ]));

        Fortify::twoFactorChallengeView(fn() => Inertia::render('auth/two-factor-challenge'));

        Fortify::confirmPasswordView(fn() => Inertia::render('auth/confirm-password'));
    }

    /**
     * Configure rate limiting.
     */
    private function configureRateLimiting(): void
    {
        RateLimiter::for('two-factor', function (Request $request) {
            return Limit::perMinute(5)->by($request->session()->get('login.id'));
        });

        RateLimiter::for('login', function (Request $request) {
            $throttleKey = Str::transliterate(Str::lower($request->input(Fortify::username())) . '|' . $request->ip());

            return Limit::perMinute(5)->by($throttleKey);
        });
    }

    private function configureAuthLogic(): void
    {
        Fortify::authenticateUsing(function (Request $request) {
            $host = $request->getHost();

            $user = User::where('email', $request->email)->first();

            if (! $user || ! Hash::check($request->password, $user->password)) {
                Log::warning('Fortify auth failed', [
                    'reason' => ! $user ? 'user_not_found' : 'password_mismatch',
                    'host' => $host,
                    'username' => $request->email,
                ]);

                return null;
            }

            if (str_contains($host, 'admin.')) {
                if (! $user->isPlatformUser()) {
                    Log::warning('Fortify auth rejected: non-platform user on admin host', [
                        'user_id' => $user->id,
                        'email' => $request->email,
                        'type' => $request->type,
                        'host' => $host,
                    ]);

                    return null;
                }

                return $user;
            }

            if (str_contains($host, 'app.')) {
                if ($user->isPlatformUser()) {
                    Log::warning('Fortify auth rejected: platform user on app host', [
                        'user_id' => $user->id,
                        'email' => $request->email,
                        'type' => $request->type,
                        'host' => $host,
                    ]);

                    return null;
                }

                return $user;
            }

            Log::warning('Fortify auth rejected: unknown host', [
                'host' => $host,
                'email' => $request->email,
                'user_id' => $user->id,
            ]);

            return null;
        });
    }
}
