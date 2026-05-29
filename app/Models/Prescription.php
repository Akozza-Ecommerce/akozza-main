<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Fillable([
    'user_id', 'customer_id', 'name', 'right_sph', 'right_cyl', 
    'right_distance_va', 'right_axis', 'right_add', 'right_near_va', 
    'left_sph', 'left_cyl', 'left_distance_va', 'left_axis', 'left_add', 
    'left_near_va', 'ipd_distance', 'ipd_near', 'receipt_source', 'ipd_source'
])]
class Prescription extends Model
{
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function customer(): BelongsTo
    {
        return $this->belongsTo(Customer::class);
    }
}
