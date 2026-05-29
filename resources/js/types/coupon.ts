export type CouponType = 'percentage' | 'fixed';
export type CouponTarget = 'category' | 'product';
export type DayOfWeek = 'Sunday' | 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';

export type CouponDay = {
    coupon_id: number;
    day_of_week: DayOfWeek;
};

import type { Product } from './product';
import type { Category } from './category';

export type CouponTargetItem = {
    coupon_id: number;
    category_id: number | null;
    product_id: number | null;
    product?: Product;
    category?: Category;
};

export type Coupon = {
    id: number;
    user_id: number;
    code: string;
    value: number;
    limit: number;
    minimum_invoice_amount: number;
    note: string | null;
    type: CouponType;
    target: CouponTarget;
    is_active: boolean;
    start_date: string;
    end_date: string;
    days?: CouponDay[];
    targets?: CouponTargetItem[];
    created_at: string;
    updated_at: string;
};
