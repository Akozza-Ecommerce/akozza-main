<?php

namespace App\Http\Resources\Admin\Tenant;

use App\Http\Resources\Base\TenantResource as BaseTenantResource;
use Illuminate\Http\Request;

class TenantResource extends BaseTenantResource
{
    public function toArray(Request $request): array
    {
        return array_merge(parent::toArray($request), [
            'type' => 'tenant',
        ]);
    }
}
