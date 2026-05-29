import { User } from "./auth";
import { Coupon } from "./coupon";
import { Customer } from "./customer";
import { Invoice } from "./invoice";
import { Product } from "./product";

export interface Order {
    id: number;
    customer: Customer;
    user: User;
    invoice: Invoice;
    subtotal: number;
    number: string;
    status: string;
    note: string | null;
    coupon?: Coupon;
    items: OrderItem[];
    date: string;
    created_at: string;
    updated_at: string;
}

export interface OrderItem {
    id: number;
    order_id: number;
    product: Product;
    quantity: number;
    unit_price: number;
    total_amount: number;
}