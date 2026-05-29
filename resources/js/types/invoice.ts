import { User } from './auth';
import { Coupon } from './coupon';
import type { Customer } from './customer';
import { Order } from './order';
import type { Product } from './product';

export type InvoiceStatus = 'paid' | 'pending' | 'overdue' | 'cancelled' | 'partial';

export type InvoiceItem = {
    id: number;
    invoice_id: number;
    product_id: number;
    unit_price: number;
    quantity: number;
    total_amount: number;
    product?: Product;
    created_at: string;
    updated_at: string;
};

export type InvoicePayment = {
    id: number;
    payment_method_id: number;
    invoice_id: number;
    payment_method_name: string;
    amount: number;
    paid_date: string;
    transaction_id?: string;
    status: string;
    notes: string;
    created_at: string;
    updated_at: string;
};

export type Invoice = {
    id: number;
    user: User;
    customer: Customer;
    order: Order;
    number: number;
    discount_amount: number | null;
    coupon_amount: number | null;
    tax_rate: number;
    tax_amount: number;
    due_amount: number;
    paid_amount: number;
    subtotal: number;
    total_amount: number;
    note: string | null;
    pdf: string | null;
    status: string;
    date: string;
    coupon?: Coupon;
    payments?: InvoicePayment[];
    created_at: string;
    updated_at: string;
};
