<?php

namespace App\Actions;

use App\Enums\UserType;
use App\Models\User;

class CreateNewUserWithoutValidation
{
    /**
     * Create a new class instance.
     */
    public function create(array $input): User
    {
        return User::create([
            'name' => $input['name'],
            'username' => generateUniqueIdentifier($input['name']),
            'type' => UserType::DEFAULT,
            'email' => $input['email'],
            'password' => $input['password'],
        ]);
    }
}
