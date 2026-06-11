<?php

namespace App\Http\Requests\Vendor\Store;

use Illuminate\Foundation\Http\FormRequest;

class UpdateStoreRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:150'],
            'slug' => ['required', 'string', 'max:150', 'unique:stores,slug,' . $this->route('store')->getKey()],
            'description' => ['nullable', 'string'],
        ];
    }
}
