<?php

namespace App\Concerns\Traits\Scopes;

use Illuminate\Database\Eloquent\Builder;

trait HasDefaultState
{
    public function scopeDefault(Builder $query, ?bool $value = true): Builder
    {
        $state = $value ?? true;
        return $query->where('is_default', $state);
    }
}
