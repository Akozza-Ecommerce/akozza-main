import { FormField, PageHeader } from '@/components/shared';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

import { edit, index, update } from '@/routes/invoices';
import type {
    Invoice,
    Customer,
    PaymentMethod,
    Product,
    Coupon,
} from '@/types';
import { Link, useForm } from '@inertiajs/react';
import InvoiceForm from '@/components/orders/order-form';

export default function Edit({
    invoice,
    customers,
    paymentMethods,
    products,
    coupons,
}: {
    invoice: Invoice;
    customers: Customer[];
    paymentMethods: PaymentMethod[];
    products: Product[];
    coupons: Coupon[];
}) {
    const { data, setData, put, processing, errors } = useForm({
        customer_id: invoice.customer.id.toString(),
        payments:
            invoice.payments?.map((p) => ({
                payment_method_id: p.payment_method_id.toString(),
                amount: p.amount,
            })) || [],
        coupon_id: invoice.coupon?.id.toString() || '',
        date: invoice.date.split('T')[0], // Extract just the date part if it's a datetime
        status: invoice.status,
        notes: invoice.note || '',
        subtotal_amount: invoice.subtotal,
        discount_amount: invoice.discount_amount,
        coupon_amount: invoice.coupon_amount || 0,
        tax_amount: invoice.tax_amount,
        total_amount: invoice.total_amount,
        items:
            invoice.items?.map((i) => ({
                id: i.id,
                product_id: i.product?.id.toString(),
                quantity: i.quantity,
                unit_price: i.unit_price,
                total_amount: i.total_amount,
            })) || [],
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        put(update(invoice).url);
    };

    return (
        <div className="flex flex-col gap-6 p-8">
            <PageHeader
                title={`Edit Invoice #INV-${invoice.id.toString().padStart(4, '0')}`}
                description="Update billing and invoice details."
            />

            <InvoiceForm
                data={data}
                setData={setData}
                processing={processing}
                errors={errors}
                customers={customers}
                paymentMethods={paymentMethods}
                products={products}
                coupons={coupons}
                invoiceCoupon={invoice.coupon}
                onSubmit={submit}
            />
        </div>
    );
}

Edit.layout = {
    breadcrumbs: [
        { title: 'Invoices', href: index() },
        { title: 'Edit', href: '#' },
    ],
};
