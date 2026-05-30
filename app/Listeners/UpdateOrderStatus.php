<?php

namespace App\Listeners;

use App\Enums\InvoiceStatus;
use App\Enums\OrderStatus;
use App\Events\InvoiceProcessed;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Log;

class UpdateOrderStatus
{
    /**
     * Handle the event.
     */
    public function handle(InvoiceProcessed $event): void
    {
        switch ($event->invoice->status) {
            case InvoiceStatus::PAID:
                $event->order->update(['status' => OrderStatus::COMPLETED]);
                break;
            case InvoiceStatus::PARTIALLY_PAID:
                $event->order->update(['status' => OrderStatus::INPROGRESS]);
                break;
            case InvoiceStatus::UNPAID:
                $event->order->update(['status' => OrderStatus::PENDING]);
                break;
        }
    }
}
