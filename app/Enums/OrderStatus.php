<?php

namespace App\Enums;

enum OrderStatus: string
{
    case PENDING = 'pending';
    case INPROGRESS = 'in progress';
    case COMPLETED = 'completed';
    case CANCELED = 'canceled';
    case AWAITING_PAYMENT = 'awaiting_payment';

    public function gerLabel(): string {
        return match($this) {
            self::PENDING => 'Pending',
            self::INPROGRESS => 'In Progress',
            self::COMPLETED => 'Completed',
            self::CANCELED => 'Canceled',
            self::AWAITING_PAYMENT => 'Awaiting Payment',
        };
    }
}
