<?php

namespace App\Actions\Fortify;

use App\Actions\CreateNewUserWithoutValidation;
use App\Concerns\PasswordValidationRules;
use App\Concerns\VendorMembersRegistrationValidationRules;
use App\Models\User;
use Illuminate\Support\Facades\Validator;
use Laravel\Fortify\Contracts\CreatesNewUsers;

class CreateNewUser implements CreatesNewUsers
{
    use PasswordValidationRules, VendorMembersRegistrationValidationRules;

    public function __construct(protected CreateNewUserWithoutValidation $createNewUser) {}

    /**
     * Validate and create a newly registered user.
     *
     * @param  array<string, string>  $input
     */
    public function create(array $input): User
    {
        Validator::make($input, [
            ...$this->registerRules(),
            'password' => $this->passwordRules(),
        ])->validate();

        return $this->createNewUser->create($input);
    }
}
