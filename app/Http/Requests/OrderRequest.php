<?php

namespace App\Http\Requests;

use App\Services\CouponService;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class OrderRequest extends FormRequest
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
            'coupon_id' => 'nullable|exists:coupons,id',
            'date' => 'required|date',
            'discount_amount' => 'required|numeric',
            'tax_amount' => 'required|numeric',
            'notes' => 'nullable|string',

            // Payments validation
            'payments' => 'required|array|min:1',
            // 'payments.*.payment_method_id' => 'required|exists:payment_methods,id',
            // 'payments.*.amount' => 'required|numeric|min:0.01',

            // Product items validation
            'items' => 'required|array|min:1',
            'items.*.product_id' => 'required|exists:products,id',
            'items.*.quantity' => 'required|integer|min:1',
            'items.*.unit_price' => 'required|numeric',
        ];
    }

    public function after(CouponService $couponService)
    {
        return [
            function ($validator) use ($couponService) {
                $data = $this->all();

                // Validate coupon applicability
                if (isset($data['coupon_id'])) {
                    if (!$couponService->isCouponValidForToday($data['coupon_id'])) {
                        $validator->errors()->add('coupon_id', 'The selected coupon cannot be applied, it is not valid for today.');
                    }
                    if (!$couponService->isCouponValidForTargets($data['coupon_id'], $data['items'] ?? [])) {
                        $validator->errors()->add('coupon_id', 'The selected coupon cannot be applied, it is not valid for the selected targets.');
                    }
                }
            }
        ];
    }
}
