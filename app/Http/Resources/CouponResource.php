<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CouponResource extends JsonResource
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
            'code' => $this->code,
            'type' => $this->type,
            'value' => $this->value,
            'limit' => $this->limit,
            'minimum_invoice_amount' => $this->minimum_invoice_amount,
            'note' => $this->note,
            'target' => $this->target,
            'start_date' => $this->start_date,
            'end_date' => $this->end_date,
            'is_active' => (bool)$this->is_active,
            'days' => $this->whenLoaded('days'),
            'targets' => $this->whenLoaded('targets'),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
