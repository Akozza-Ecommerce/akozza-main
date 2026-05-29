<?php

namespace App\Models;

use App\Enums\InvoicePaymentStatus;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

#[Fillable([
    'invoice_id',
    'payment_method_id',
    'amount',
    'transaction_id',
    'paid_date',
    'notes',
    'status'
])]


class InvoicePayment extends Model
{

    protected $casts = [
        'status' => InvoicePaymentStatus::class
    ];

    public function invoice()
    {
        return $this->belongsTo(Invoice::class);
    }

    public function paymentMethod()
    {
        return $this->belongsTo(PaymentMethod::class);
    }
}
