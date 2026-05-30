<?php

namespace App\Enums;

enum InvoiceStatus: string
{
    case DRAFT = 'draft';
    case UNPAID = 'unpaid';
    case PAID = 'paid';
    case PARTIALLY_PAID = 'partially_paid';
    case CANCELED = 'canceled';
    case REPLACED = 'replaced';

    public function getLabel(): string
    {
        return match ($this) {
            self::UNPAID => 'Unpaid',
            self::PAID => 'Paid',
            self::PARTIALLY_PAID => 'Partially Paid',
            self::CANCELED => 'Canceled',
            self::REPLACED => 'Replaced',
        };
    }
}
