<?php

use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

/*
| $identifier is the value used to generate
| the unique value from and it can be name or email for example
*/

function generateUniqueIdentifier(string $identifier, string $table = 'users', string $column = 'username'): string
{
    $identifier = Str::slug(explode('@', $identifier)[0]); // If email is passed

    // Trim base to fit 10 characters
    $identifier = substr($identifier, 0, 10);

    $username = $identifier;

    // If length is less than 10, fill with random numbers/letters
    while (strlen($username) < 10) {
        $username .= Str::random(1);
    }

    // If username already exists, mutate last characters until unique
    $maxAttempts = 1000;
    $attempt = 0;

    while (
        DB::table($table)->where($column, $username)->exists() &&
        $attempt < $maxAttempts
    ) {
        // Replace last 3 characters with random
        $username = substr($identifier, 0, 7) . Str::random(3);
        $attempt++;
    }

    return $username;
}
