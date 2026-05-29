import InvoiceForm from '@/components/orders/order-form';
import { PageHeader } from '@/components/shared';
import { create, index, store } from '@/routes/invoices';
import type { Customer, PaymentMethod, Product, Coupon } from '@/types';
import { useForm } from '@inertiajs/react';

export default function Create({
    customers,
    paymentMethods,
    products,
    coupons,
}: {
    customers: Customer[];
    paymentMethods: PaymentMethod[];
    products: Product[];
    coupons: Coupon[];
}) {
    const today = new Date().toISOString().split('T')[0];

    const { data, setData, post, processing, errors } = useForm({
        customer_id: '',
        payments: [
            // {payment_method_id: '', amount: 0},
        ],
        coupon_id: '',
        date: today,
        notes: '',
        subtotal_amount: 0,
        discount_amount: 0,
        coupon_amount: 0,
        tax_amount: 0,
        total_amount: 0,
        items: [] as any[],
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(store.url());
    };
    return (
        <div className="flex flex-col gap-6 p-8">
            <PageHeader
                title="Create Invoice"
                description="Generate a new invoice."
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
                onSubmit={submit}
            />
        </div>
    );
}

Create.layout = {
    breadcrumbs: [
        { title: 'Invoices', href: index() },
        { title: 'Create', href: create() },
    ],
};
