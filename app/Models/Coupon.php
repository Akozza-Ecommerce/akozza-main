<?php

namespace App\Models;

use App\Concerns\Traits\Scopes\HasActiveState;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

#[Fillable(['user_id', 'tenant_id', 'store_id', 'code', 'value', 'limit', 'minimum_invoice_amount', 'note', 'type', 'target', 'is_active', 'start_date', 'end_date'])]
class Coupon extends Model
{
    use HasActiveState;

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'value' => 'decimal:2',
            'limit' => 'integer',
            'minimum_invoice_amount' => 'decimal:2',
            'is_active' => 'boolean',
            'end_date' => 'datetime',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function days(): HasMany
    {
        return $this->hasMany(CouponDay::class);
    }

    public function targets(): HasMany
    {
        return $this->hasMany(CouponTarget::class);
    }
}
