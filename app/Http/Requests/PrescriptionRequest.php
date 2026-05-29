<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class PrescriptionRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'customer_id' => 'required|exists:customers,id',
            'name' => 'required|string|max:255',
            'right_sph' => 'nullable|string|max:255',
            'right_cyl' => 'nullable|string|max:255',
            'right_distance_va' => 'nullable|string|max:255',
            'right_axis' => 'nullable|string|max:255',
            'right_add' => 'nullable|string|max:255',
            'right_near_va' => 'nullable|string|max:255',
            'left_sph' => 'nullable|string|max:255',
            'left_cyl' => 'nullable|string|max:255',
            'left_distance_va' => 'nullable|string|max:255',
            'left_axis' => 'nullable|string|max:255',
            'left_add' => 'nullable|string|max:255',
            'left_near_va' => 'nullable|string|max:255',
            'ipd_distance' => 'nullable|string|max:255',
            'ipd_near' => 'nullable|string|max:255',
            'receipt_source' => 'nullable|string|max:255',
            'ipd_source' => 'nullable|string|max:255',
        ];
    }
}
