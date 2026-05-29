<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PrescriptionResource extends JsonResource
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
            'customer_id' => $this->customer_id,
            'customer' => new CustomerResource($this->whenLoaded('customer')),
            'name' => $this->name,
            'right_sph' => $this->right_sph,
            'right_cyl' => $this->right_cyl,
            'right_axis' => $this->right_axis,
            'right_add' => $this->right_add,
            'right_distance_va' => $this->right_distance_va,
            'right_near_va' => $this->right_near_va,
            'left_sph' => $this->left_sph,
            'left_cyl' => $this->left_cyl,
            'left_axis' => $this->left_axis,
            'left_add' => $this->left_add,
            'left_distance_va' => $this->left_distance_va,
            'left_near_va' => $this->left_near_va,
            'ipd_distance' => $this->ipd_distance,
            'ipd_near' => $this->ipd_near,
            'receipt_source' => $this->receipt_source,
            'ipd_source' => $this->ipd_source,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
