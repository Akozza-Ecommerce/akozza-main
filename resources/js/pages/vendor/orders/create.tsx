import { PageHeader } from '@/components/shared';
import { create, index, store } from '@/routes/orders';
import type {
    Customer,
    PaymentMethod,
    Product,
    Coupon,
} from '@/types';
import { useForm } from '@inertiajs/react';
import OrderForm from '@/components/orders/order-form';

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
        status: 'pending',
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
                title="Create Order"
                description="Generate a new order."
            />

            <OrderForm
                data={data}
                setData={setData}
                processing={processing}
                errors={errors}
                customers={customers}
                paymentMethods={paymentMethods}
                products={products}
                coupons={coupons}
                invoiceCoupon={null}
                onSubmit={submit}
            />
        </div>
    );
}

Create.layout = {
    breadcrumbs: [
        { title: 'Orders', href: index() },
        { title: 'Create', href: create() },
    ],
};
