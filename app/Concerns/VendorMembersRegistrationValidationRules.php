<?php

namespace App\Concerns;

trait VendorMembersRegistrationValidationRules
{
    protected function registerRules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
        ];
    }
}
