<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OrderResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'number' => $this->number,
            'customer' => $this->WhenLoaded('customer', fn() => new CustomerResource($this->customer)),
            'user' => $this->WhenLoaded('user', fn() => new UserResource($this->user)),
            'currentInvoice' => $this->WhenLoaded('currentInvoice', fn() => new InvoiceResource($this->currentInvoice)),
            'invoices' => $this->WhenLoaded('invoices', fn() => InvoiceResource::collection($this->invoices)),
            'items' => $this->WhenLoaded('items', fn() => OrderItemResource::collection($this->items)),
            'subtotal' => $this->subtotal,
            'status' => $this->status,
            'notes' => $this->notes,
            'date' => $this->date,
            'created_at' => $this->created_at,
        ];
    }
}
