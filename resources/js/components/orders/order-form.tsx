import { FormField } from '@/components/shared';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Trash2 } from 'lucide-react';
import { formatCurrency, formatPrice } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { index } from '@/routes/invoices';
import { Link } from '@inertiajs/react';
import type { Customer, PaymentMethod, Product, Coupon } from '@/types';
import PaymentMethods from './payment-methods';
import InputError from '../input-error';

interface InvoiceFormProps {
    data: any;
    setData: any;
    processing: any;
    errors: any;
    customers: Customer[];
    paymentMethods: PaymentMethod[];
    products: Product[];
    coupons: Coupon[];
    invoiceCoupon?: Coupon | null;
    onSubmit: (data: any) => void;
}

export default function InvoiceForm({
    data,
    setData,
    processing,
    errors,
    customers,
    paymentMethods,
    products,
    coupons,
    onSubmit,
    invoiceCoupon
}: InvoiceFormProps) {
    const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(invoiceCoupon || null);

    // Calculate totals whenever items or coupon changes
    useEffect(() => {
        calculateTotals();
    }, [
        data.items,
        selectedCoupon,
        data.subtotal_amount,
        data.discount_amount,
        data.coupon_id,
        data.tax_amount,
        data.total_amount,
    ]);

    const addItem = () => {
        setData('items', [
            ...data.items,
            {
                product_id: '',
                quantity: 1,
                unit_price: 0,
                total_amount: 0,
            },
        ]);
    };

    const removeItem = (index: number) => {
        const newItems = [...data.items];
        newItems.splice(index, 1);
        setData('items', newItems);
    };

    const updateItem = (index: number, field: string, value: any) => {
        const newItems = [...data.items];
        newItems[index] = { ...newItems[index], [field]: value };

        // Auto-fill price if product is selected
        if (field === 'product_id') {
            const product = products.find(
                (p) => p.id.toString() === value.toString(),
            );
            if (product) {
                newItems[index].unit_price = product.price;
            }
        }

        // Recalculate item subtotal
        newItems[index].total_amount =
            newItems[index].quantity * newItems[index].unit_price;

        setData('items', newItems);
    };

    const calculateTotals = () => {
        const subtotal = data.items.reduce(
            (sum: number, item: any) => sum + item.quantity * item.unit_price,
            0,
        );
        const couponAmount = calculateCouponAmount(subtotal);
        const tax =
            (subtotal - couponAmount - data.discount_amount) * 0.1; // Example 10% tax
        const total =
            subtotal - couponAmount - data.discount_amount + tax;

        // Only update if values changed to prevent infinite loop
        if (
            subtotal !== data.subtotal_amount ||
            tax !== data.tax_amount ||
            total !== data.total_amount
        ) {
            setData((prevData) => ({
                ...prevData,
                coupon_amount: couponAmount,
                subtotal_amount: subtotal,
                tax_amount: tax,
                total_amount: total,
            }));
        }
    };

    const handleCouponChange = (couponId: string) => {
        setData('coupon_id', couponId);
        const coupon = coupons.find(
            (c) => c.id.toString() === couponId.toString(),
        );
        setSelectedCoupon(coupon || null);
    };

    const calculateCouponAmount = (subtotal: number) => {
        if (!selectedCoupon) return 0;
        return selectedCoupon.type === 'fixed'
            ? selectedCoupon.value
            : subtotal * (selectedCoupon.value / 100);
    }

    console.log('data: ', data);

    return (
        <form onSubmit={onSubmit} className="space-y-8">
            {/* General Information */}
            <div className="rounded-xl border bg-card p-6 shadow-sm">
                <h3 className="mb-6 text-lg font-semibold">
                    General Information
                </h3>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <FormField
                        id="customer_id"
                        label="Customer"
                        error={errors.customer_id}
                    >
                        <select
                            id="customer_id"
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none"
                            value={data.customer_id}
                            onChange={(e) =>
                                setData('customer_id', e.target.value)
                            }
                            required
                        >
                            <option value="">Select a customer...</option>
                            {customers.map((c) => (
                                <option key={c.id} value={c.id}>
                                    {c.name}
                                </option>
                            ))}
                        </select>
                    </FormField>

                    <FormField
                        id="date"
                        label="Invoice Date"
                        error={errors.date}
                    >
                        <Input
                            id="date"
                            type="date"
                            value={data.date}
                            onChange={(e) => setData('date', e.target.value)}
                            required
                        />
                    </FormField>
                </div>
            </div>

            {/* Line Items */}
            <div className="rounded-xl border bg-card p-6 shadow-sm">
                <div className="mb-6 flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Line Items</h3>
                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={addItem}
                    >
                        <Plus className="mr-2 h-4 w-4" /> Add Item
                    </Button>
                </div>

                {data.items.length === 0 && (
                    <div className="rounded-lg border border-dashed bg-muted/30 py-8 text-center text-muted-foreground">
                        No items added yet. Click "Add Item" to start.
                    </div>
                )}
                {errors.items && (
                    <p className="mb-4 text-sm font-medium text-red-500">
                        {errors.items}
                    </p>
                )}

                <div className="space-y-4">
                    {data.items.map((item, index) => (
                        <div
                            key={index}
                            className="flex flex-col items-end gap-4 rounded-lg border bg-muted/10 p-4 md:flex-row"
                        >
                            <div className="w-full flex-1">
                                <Label className="mb-2 block">Product</Label>
                                <select
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                    value={item.product_id}
                                    onChange={(e) =>
                                        updateItem(
                                            index,
                                            'product_id',
                                            e.target.value,
                                        )
                                    }
                                    required
                                >
                                    <option value="">Select product...</option>
                                    {products.map((p) => (
                                        <option key={p.id} value={p.id}>
                                            {p.name} - {formatCurrency(p.price)}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="w-full md:w-24">
                                <Label className="mb-2 block">Qty</Label>
                                <Input
                                    type="number"
                                    min="1"
                                    value={item.quantity}
                                    onChange={(e) =>
                                        updateItem(
                                            index,
                                            'quantity',
                                            parseInt(e.target.value) || 0,
                                        )
                                    }
                                    required
                                />
                            </div>
                            <div className="w-full md:w-32">
                                <Label className="mb-2 block">Price</Label>
                                <Input
                                    type="number"
                                    step="0.01"
                                    value={item.unit_price}
                                    onChange={(e) =>
                                        updateItem(
                                            index,
                                            'unit_price',
                                            parseFloat(e.target.value) || 0,
                                        )
                                    }
                                    required
                                />
                            </div>
                            <div className="flex h-10 w-full items-center px-3 pt-2 font-medium md:w-32 md:pt-0">
                                {formatCurrency(item.total_amount)}
                            </div>
                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="h-10 w-10 shrink-0 text-destructive hover:text-destructive"
                                onClick={() => removeItem(index)}
                            >
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Payment Information */}
            <div className="rounded-xl border bg-card p-6 shadow-sm">
                <h3 className="mb-6 text-lg font-semibold">
                    Payment Information
                </h3>
                <PaymentMethods
                    data={data}
                    setData={setData}
                    errors={errors}
                    paymentMethods={paymentMethods}
                />
            </div>

            {/* Summary & Notes */}
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                <div>
                    <FormField id="notes" label="Notes" error={errors.notes}>
                        <Textarea
                            id="notes"
                            rows={5}
                            value={data.notes}
                            onChange={(e) => setData('notes', e.target.value)}
                            placeholder="Thank you for your business..."
                        />
                    </FormField>
                </div>

                <div className="space-y-4 rounded-xl border bg-card p-6 shadow-sm">
                    <h3 className="mb-4 text-lg font-semibold">Summary</h3>

                    <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span>{formatCurrency(data.subtotal_amount)}</span>
                    </div>

                    <div className="flex items-center gap-4 py-2">
                        <Label className="w-24 text-sm text-muted-foreground">
                            Discount
                        </Label>
                        <Input
                            type="number"
                            step="0.01"
                            min="0"
                            value={data.discount_amount}
                            onChange={(e) =>
                                setData(
                                    'discount_amount',
                                    formatPrice(e.target.value) || 0,
                                )
                            }
                        />
                    </div>

                    <div className="flex items-center gap-4 py-2">
                        <span className="w-24 text-sm text-muted-foreground">
                            Coupon
                        </span>
                        <div className="w-full">
                            <select
                                className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm"
                                value={data.coupon_id}
                                onChange={(e) =>
                                    handleCouponChange(e.target.value)
                                }
                            >
                                <option value="">None</option>
                                {coupons.map((c) => (
                                    <option key={c.id} value={c.id}>
                                        {c.code} (
                                        {c.type === 'percentage'
                                            ? c.value + '%'
                                            : formatCurrency(c.value)}
                                        )
                                    </option>
                                ))}
                            </select>
                            <span className="text-sm text-muted-foreground text-end mt-1 block">
                                {data.coupon_amount > 0 &&
                                    `- ${formatCurrency(data.coupon_amount)}`}
                            </span>

                            <InputError message={errors?.coupon_id} />
                        </div>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Discount</span>
                        <span className="text-red-500">
                            -{formatCurrency(data.discount_amount)}
                        </span>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Tax (10%)</span>
                        <span>{formatCurrency(data.tax_amount)}</span>
                    </div>

                    <div className="flex items-center justify-between border-t pt-4">
                        <span className="text-lg font-semibold">Total</span>
                        <span className="text-xl font-bold text-primary">
                            {formatCurrency(data.total_amount)}
                        </span>
                    </div>
                </div>
            </div>

            <div className="flex gap-4">
                <Button
                    type="submit"
                    disabled={processing || data.items.length === 0}
                >
                    {processing ? 'Saving...' : 'Save Invoice'}
                </Button>
                <Button type="button" variant="outline" asChild>
                    <Link href={index()}>Cancel</Link>
                </Button>
            </div>
        </form>
    );
}
