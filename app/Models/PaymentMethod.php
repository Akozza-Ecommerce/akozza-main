<?php

namespace App\Models;

use App\Concerns\Traits\Scopes\HasActiveState;
use App\Concerns\Traits\Scopes\HasDefaultState;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Stancl\Tenancy\Database\Concerns\BelongsToTenant;

#[Fillable(['user_id', 'name', 'is_default', 'is_active', 'tenant_id', 'store_id'])]
class PaymentMethod extends Model
{
    use HasActiveState, HasDefaultState, BelongsToTenant;

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'is_default' => 'boolean',
            'is_active' => 'boolean',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
