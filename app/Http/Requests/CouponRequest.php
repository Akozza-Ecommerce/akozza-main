<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class CouponRequest extends FormRequest
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
        $couponId = $this->route('coupon')?->id;
        return [
            'code' => ['required', 'string', 'max:255', Rule::unique('coupons')->where('tenant_id', $this->user()?->active_tenant_id)->ignore($couponId)],
            'type' => 'required|string|in:percentage,fixed',
            'value' => 'required|numeric|min:0',
            'is_active' => 'boolean',
            'limit' => 'required|integer|min:0',
            'minimum_invoice_amount' => 'required|numeric|min:0',
            'note' => 'nullable|string|max:500',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',

            // coupon days
            'days' => 'nullable|array',
            'days.*' => 'required|in:Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday',

            // coupon target (category or product)
            'target' => 'required|string|in:category,product',
            'target_ids' => [
                'required',
                'array',
            ],
            'target_ids.*' => [
                'required',
                'integer',
                $this->input('target') == 'product' ? Rule::exists('products', 'id') : Rule::exists('categories', 'id')
            ],
        ];
    }
}
