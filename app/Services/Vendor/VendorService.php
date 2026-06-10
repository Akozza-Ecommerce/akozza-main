<?php

namespace App\Services\Vendor;

use App\Actions\CreateNewUserWithoutValidation;
use App\Actions\Fortify\CreateNewUser;
use App\Models\User;

class VendorService
{
    /**
     * Create a new class instance.
     */
    public function __construct(protected CreateNewUserWithoutValidation $createNewUser) {}

    public function createVendor(array $input): User {
        return $this->createNewUser->create($input);
    }

    public function updateVendor(User $user, array $input): User {
        $user->update($input);

        return $user;
    }
}
