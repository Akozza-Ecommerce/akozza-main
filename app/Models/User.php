<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use App\Enums\UserType;
use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Hidden;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Fortify\TwoFactorAuthenticatable;
use Spatie\Permission\Traits\HasRoles;

#[Fillable(['name', 'username', 'email', 'password', 'type', 'status'])]
#[Hidden(['password', 'two_factor_secret', 'two_factor_recovery_codes', 'remember_token'])]
class User extends Authenticatable
{
    /** @use HasFactory<UserFactory> */
    use HasFactory, Notifiable, TwoFactorAuthenticatable, HasRoles;

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'type' => UserType::class,
            'two_factor_confirmed_at' => 'datetime',
        ];
    }

    public function scopeVendors(Builder $query)
    {
        return $query->whereHas('roles', function ($q) {
            $q->where('name', 'vendor');
        })->orWhereNotIn('type', [UserType::PLATFORM_ADMIN, UserType::PLATFORM_STAFF]);
    }

    public function ownedTenant(): HasOne
    {
        return $this->hasOne(Tenant::class, 'owner_id');
    }

    public function isPlatformUser(): bool
    {
        return in_array($this->type, [UserType::PLATFORM_ADMIN, UserType::PLATFORM_STAFF]);
    }
}
