<?php

namespace App\Models;

use App\Concerns\Traits\Scopes\HasActiveState;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

#[Fillable(['name', 'is_active'])]
class Category extends Model
{
    use HasActiveState;

    public function products(): HasMany
    {
        return $this->hasMany(Product::class);
    }
}
