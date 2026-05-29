<?php

namespace App\Enums;

enum InvoicePaymentStatus: string
{
    case Paid = 'paid';
    case Pending = 'pending';
    case Cancelled = 'cancelled';

    public function getLabel(): string
    {
        return match ($this) {
            self::Paid => 'Paid',
            self::Pending => 'Pending',
            self::Cancelled => 'Cancelled',
        };
    }
}
