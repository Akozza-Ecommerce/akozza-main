<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

#[Fillable(['tenant_id', 'name', 'slug', 'description'])]
class Store extends Model
{
    public function tenant()
    {
        return $this->belongsTo(Tenant::class);
    }
}
