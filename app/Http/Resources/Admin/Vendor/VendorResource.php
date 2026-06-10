<?php

namespace App\Http\Resources\Admin\Vendor;

use App\Http\Resources\Base\VendorResource as BaseVendorResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class VendorResource extends BaseVendorResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return array_merge(parent::toArray($request), [
            'type' => $this->type
        ]);
    }
}
