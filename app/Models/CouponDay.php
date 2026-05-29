<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Fillable(['coupon_id', 'day_of_week'])]
class CouponDay extends Model
{
    public $timestamps = false;

    public function coupon(): BelongsTo
    {
        return $this->belongsTo(Coupon::class);
    }
}
