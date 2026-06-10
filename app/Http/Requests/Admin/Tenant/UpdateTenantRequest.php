<?php

namespace App\Http\Requests\Admin\Tenant;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Gate;
use Illuminate\Validation\Rule;

class UpdateTenantRequest extends FormRequest
{
    public function authorize(): bool
    {
        return Gate::allows('admin.tenants.edit');
    }

    public function rules(): array
    {
        $tenant = $this->route('tenant');

        return [
            'name' => [
                'required',
                'string',
                'max:50',
                Rule::unique('tenants', 'name')->ignore($tenant?->id),
            ],
            'owner_id' => ['required', 'integer', Rule::exists('users', 'id')],
        ];
    }
}
