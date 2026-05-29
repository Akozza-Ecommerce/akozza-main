import { PageHeader } from '@/components/shared';
import { index, update } from '@/routes/orders';
import type {
    Customer,
    PaymentMethod,
    Product,
    Coupon,
} from '@/types';
import { useForm } from '@inertiajs/react';
import OrderForm from '@/components/orders/order-form';
import type { Order } from '@/types/order';

export default function Edit({
    order,
    customers,
    paymentMethods,
    products,
    coupons,
}: {
    order: Order;
    customers: Customer[];
    paymentMethods: PaymentMethod[];
    products: Product[];
    coupons: Coupon[];
}) {
    const { data, setData, put, processing, errors } = useForm({
        customer_id: order.customer.id.toString(),
        payments:
            order.invoice.payments?.map((p) => ({
                payment_method_id: p.payment_method_id.toString(),
                amount: p.amount,
            })) || [],
        coupon_id: order.invoice.coupon?.id.toString() || '',
        date: order.date.split('T')[0], // Extract just the date part if it's a datetime
        status: order.status,
        notes: order.note || '',
        subtotal_amount: order.subtotal,
        discount_amount: order.invoice.discount_amount,
        coupon_amount: order.invoice.coupon_amount || 0,
        tax_amount: order.invoice.tax_amount,
        total_amount: order.invoice.total_amount,
        items:
            order.items?.map((i) => ({
                id: i.id,
                product_id: i.product?.id.toString(),
                quantity: i.quantity,
                unit_price: i.unit_price,
                total_amount: i.total_amount,
            })) || [],
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        put(update(order).url);
    };

    return (
        <div className="flex flex-col gap-6 p-8">
            <PageHeader
                title={`Edit Order #ORD-${order.id.toString().padStart(4, '0')}`}
                description="Update order details."
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
                invoiceCoupon={order.invoice.coupon || null}
                onSubmit={submit}
            />
        </div>
    );
}

Edit.layout = {
    breadcrumbs: [
        { title: 'Orders', href: index() },
        { title: 'Edit', href: '#' },
    ],
};
