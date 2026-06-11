<?php

namespace App\Models;

use App\Enums\InvoiceStatus;
use App\Enums\OrderStatus;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Stancl\Tenancy\Database\Concerns\BelongsToTenant;

#[Fillable([
    'user_id', 'customer_id', 'number',
    'subtotal', 'note', 'status', 'date', 'tenant_id', 'store_id'
])]
class Order extends Model
{
    use BelongsToTenant;

    protected $casts = [
        'status' => OrderStatus::class
    ];

     public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function customer(): BelongsTo
    {
        return $this->belongsTo(Customer::class);
    }

    public function items(): HasMany
    {
        return $this->hasMany(OrderItem::class);
    }

    public function invoices(): HasMany
    {
        return $this->hasMany(Invoice::class);
    }

    public function currentInvoice(): HasOne
    {
        return $this->hasOne(Invoice::class)->whereNotIn('status', [InvoiceStatus::REPLACED, InvoiceStatus::CANCELED])->latestOfMany();
    }
}
