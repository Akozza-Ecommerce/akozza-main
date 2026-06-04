<?php

namespace App\Models;

use App\Concerns\Traits\Scopes\HasActiveState;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Stancl\Tenancy\Database\Concerns\BelongsToTenant;

#[Fillable(['name', 'is_active', 'tenant_id', 'store_id'])]
class Category extends Model
{
    use HasActiveState, BelongsToTenant;

    public function products(): HasMany
    {
        return $this->hasMany(Product::class);
    }
}
