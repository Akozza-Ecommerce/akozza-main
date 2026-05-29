import { Category } from './category';

export type Product = {
    id: number;
    barcode: string;
    name: string;
    category_id: number;
    category?: Category;
    cost: number;
    price: number;
    qty: number;
    user_id: number;
    is_active: boolean;
    created_at: string;
    updated_at: string;
};
