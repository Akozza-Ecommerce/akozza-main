<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class InvoiceResource extends JsonResource
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
            'order' => $this->WhenLoaded('order', fn() => new OrderResource($this->order)),
            'payments' => $this->WhenLoaded('payments', fn() => InvoicePaymentResource::collection($this->payments)),
            'coupon' => $this->WhenLoaded('coupon', function () {
                return [
                    'id' => $this->coupon->id,
                    'code' => $this->coupon->code,
                    'type' => $this->coupon->type,
                    'value' => $this->coupon->value,
                ];
            }),
            'paid_amount' => $this->paid_amount,
            'due_amount' => $this->due_amount,
            'subtotal' => $this->subtotal,
            'coupon_amount' => $this->coupon_amount,
            'discount_amount' => $this->discount_amount,
            'tax_amount' => $this->tax_amount,
            'tax_rate' => $this->tax_rate,
            'total_amount' => $this->total_amount,
            'status' => $this->status,
            'notes' => $this->notes,
            'date' => $this->date,
            'created_at' => $this->created_at,
        ];
    }
}
