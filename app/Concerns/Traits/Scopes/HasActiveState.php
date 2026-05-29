<?php

namespace App\Concerns\Traits\Scopes;

use Illuminate\Database\Eloquent\Builder;

trait HasActiveState
{
    public function scopeActive(Builder $query, ?bool $value = true): Builder
    {
        $state = $value ?? true;
        return $query->where('is_active', $state);
    }
}
