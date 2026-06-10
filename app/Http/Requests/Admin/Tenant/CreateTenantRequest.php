<?php

namespace App\Http\Requests\Admin\Tenant;

use App\Enums\UserType;
use App\Models\Tenant;
use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Gate;
use Illuminate\Validation\Rule;

class CreateTenantRequest extends FormRequest
{
    public function authorize(): bool
    {
        return Gate::allows('admin.tenants.create');
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:50'],
            'owner_id' => [
                'required',
                'integer',
                Rule::exists('users', 'id')->where(function ($query) {
                    $query->where(function ($query) {
                        $query->whereHas('roles', function ($query) {
                            $query->where('name', 'vendor');
                        })->orWhereNotIn('type', [UserType::PLATFORM_ADMIN, UserType::PLATFORM_STAFF]);
                    });
                    $query->whereNotIn('id', Tenant::select('owner_id'));
                }),
            ],
        ];
    }
}
