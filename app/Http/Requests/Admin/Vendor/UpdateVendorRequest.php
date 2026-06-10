<?php

namespace App\Http\Requests\Admin\Vendor;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Gate;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Password;

class UpdateVendorRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return Gate::allows('admin.vendors.edit');
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $vendor = $this->route('vendor');

        return [
            'name' => ['required', 'string', 'max:50'],
            'email' => [
                'required',
                'email',
                Rule::unique('users', 'email')->ignore($vendor?->id),
            ],
            'password' => ['nullable', 'string', Password::default(), 'confirmed'],
        ];
    }
}
