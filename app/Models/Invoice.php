<?php

namespace App\Models;

use App\Enums\InvoiceStatus;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

#[Fillable([
    'user_id', 'order_id', 'customer_id', 'number', 'discount_amount', 'coupon_amount',
    'coupon_id', 'tax_rate', 'tax_amount', 'due_amount', 'paid_amount', 'subtotal', 
    'total_amount', 'note', 'pdf', 'status', 'date'
])]
class Invoice extends Model
{
    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'discount_amount' => 'decimal:2',
            'coupon_amount' => 'decimal:2',
            'tax_rate' => 'decimal:2',
            'tax_amount' => 'decimal:2',
            'due_amount' => 'decimal:2',
            'paid_amount' => 'decimal:2',
            'subtotal' => 'decimal:2',
            'total_amount' => 'decimal:2',
            'delivery_date' => 'datetime',
            'status' => InvoiceStatus::class
        ];
    }

    public function order(): BelongsTo
    {
        return $this->belongsTo(Order::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function customer(): BelongsTo
    {
        return $this->belongsTo(Customer::class);
    }

    public function payments(): HasMany
    {
        return $this->hasMany(InvoicePayment::class);
    }

    public function coupon(): BelongsTo
    {
        return $this->belongsTo(Coupon::class);
    }
}
