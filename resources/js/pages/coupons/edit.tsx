import { FormField, PageHeader } from '@/components/shared';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { MultiSelect } from '@/components/ui/multi-select';

import { edit, index, update } from '@/routes/coupons';
import type { Coupon, Product, Category } from '@/types';
import { Link, useForm } from '@inertiajs/react';

const DAYS_OF_WEEK = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export default function Edit({ coupon, products, categories }: { coupon: Coupon; products: Product[]; categories: Category[] }) {
    // Format dates for datetime-local input
    const formatDateTimeLocal = (dateString?: string) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toISOString().slice(0, 16);
    };

    const initialTargetIds = coupon.target === 'product'
        ? (coupon.targets?.map(t => t.product_id?.toString()).filter(Boolean) as string[]) || []
        : (coupon.targets?.map(t => t.category_id?.toString()).filter(Boolean) as string[]) || [];

    const { data, setData, put, processing, errors } = useForm({
        code: coupon.code,
        type: coupon.type,
        value: coupon.value.toString(),
        limit: coupon.limit?.toString() || '10',
        minimum_invoice_amount: coupon.minimum_invoice_amount?.toString() || '0',
        note: coupon.note || '',
        target: coupon.target || 'product',
        target_ids: initialTargetIds,
        days: coupon.days?.map(d => d.day_of_week) || [],
        start_date: formatDateTimeLocal(coupon.start_date),
        end_date: formatDateTimeLocal(coupon.end_date),
        is_active: !!coupon.is_active,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        put(update(coupon).url);
    };

    const toggleDay = (day: string) => {
        if (data.days.includes(day)) {
            setData('days', data.days.filter((d) => d !== day));
        } else {
            setData('days', [...data.days, day]);
        }
    };

    return (
        <div className="flex flex-col gap-6 p-8">
            <PageHeader title="Edit Coupon" description={`Update details and limitations for coupon ${coupon.code}.`} />

            <form onSubmit={submit} className="space-y-6">
                <div className="bg-card text-card-foreground rounded-xl border p-6 shadow-sm space-y-6">
                    <h3 className="text-lg font-semibold border-b pb-2">General Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField id="code" label="Coupon Code" error={errors.code}>
                            <Input
                                id="code"
                                value={data.code}
                                onChange={(e) => setData('code', e.target.value.toUpperCase())}
                                placeholder="e.g. SUMMER2026"
                                className="uppercase font-mono"
                                required
                            />
                        </FormField>

                        <FormField id="note" label="Internal Note (Optional)" error={errors.note}>
                            <Input
                                id="note"
                                value={data.note}
                                onChange={(e) => setData('note', e.target.value)}
                                placeholder="e.g. Special campaign discount"
                            />
                        </FormField>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <FormField id="type" label="Discount Type" error={errors.type}>
                            <select
                                id="type"
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                value={data.type}
                                onChange={(e) => setData('type', e.target.value)}
                                required
                            >
                                <option value="percentage">Percentage (%)</option>
                                <option value="fixed">Fixed Amount</option>
                            </select>
                        </FormField>

                        <FormField id="value" label={data.type === 'percentage' ? 'Percentage Value' : 'Fixed Discount'} error={errors.value}>
                            <Input
                                id="value"
                                type="number"
                                step="0.01"
                                min="0"
                                value={data.value}
                                onChange={(e) => setData('value', e.target.value)}
                                required
                            />
                        </FormField>

                        <FormField id="limit" label="Usage Limit" error={errors.limit}>
                            <Input
                                id="limit"
                                type="number"
                                min="1"
                                value={data.limit}
                                onChange={(e) => setData('limit', e.target.value)}
                                required
                            />
                        </FormField>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <FormField id="minimum_invoice_amount" label="Minimum Invoice Amount" error={errors.minimum_invoice_amount}>
                            <Input
                                id="minimum_invoice_amount"
                                type="number"
                                step="0.01"
                                min="0"
                                value={data.minimum_invoice_amount}
                                onChange={(e) => setData('minimum_invoice_amount', e.target.value)}
                                required
                            />
                        </FormField>

                        <FormField id="start_date" label="Start Date" error={errors.start_date}>
                            <Input
                                id="start_date"
                                type="datetime-local"
                                value={data.start_date}
                                onChange={(e) => setData('start_date', e.target.value)}
                                required
                            />
                        </FormField>

                        <FormField id="end_date" label="End Date" error={errors.end_date}>
                            <Input
                                id="end_date"
                                type="datetime-local"
                                value={data.end_date}
                                onChange={(e) => setData('end_date', e.target.value)}
                                required
                            />
                        </FormField>
                    </div>
                </div>

                <div className="bg-card text-card-foreground rounded-xl border p-6 shadow-sm space-y-6">
                    <h3 className="text-lg font-semibold border-b pb-2">Limitations & Targets</h3>

                    <div className="space-y-3">
                        <Label className="text-sm font-medium">Applicable Days of the Week</Label>
                        <div className="flex flex-wrap gap-2">
                            {DAYS_OF_WEEK.map((day) => {
                                const active = data.days.includes(day);
                                return (
                                    <button
                                        key={day}
                                        type="button"
                                        onClick={() => toggleDay(day)}
                                        className={`px-4 py-2 rounded-full text-xs font-semibold border transition-all ${
                                            active
                                                ? 'bg-primary text-primary-foreground border-primary shadow-sm'
                                                : 'bg-background hover:bg-muted text-muted-foreground border-input'
                                        }`}
                                    >
                                        {day}
                                    </button>
                                );
                            })}
                        </div>
                        {errors.days && <p className="text-xs text-destructive">{errors.days}</p>}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                        <FormField id="target" label="Target Criteria" error={errors.target}>
                            <select
                                id="target"
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                value={data.target}
                                onChange={(e) => {
                                    setData((prev) => ({
                                        ...prev,
                                        target: e.target.value,
                                        target_ids: [],
                                    }));
                                }}
                                required
                            >
                                <option value="product">Specific Products</option>
                                <option value="category">Specific Categories</option>
                            </select>
                        </FormField>

                        <FormField
                            id="target_ids"
                            label={data.target === 'product' ? 'Select Products' : 'Select Categories'}
                            error={errors.target_ids}
                        >
                            <MultiSelect
                                options={data.target === 'product'
                                    ? products.map(p => ({ label: p.name, value: p.id.toString() }))
                                    : categories.map(c => ({ label: c.name, value: c.id.toString() }))
                                }
                                selected={data.target_ids}
                                onChange={(selected) => setData('target_ids', selected)}
                                placeholder={data.target === 'product' ? 'Select products...' : 'Select categories...'}
                            />
                        </FormField>
                    </div>
                </div>

                <div className="flex items-center space-x-2">
                    <Switch
                        id="is_active"
                        checked={data.is_active}
                        onCheckedChange={(checked) => setData('is_active', checked)}
                    />
                    <Label htmlFor="is_active" className="text-sm font-medium">Active (Available for use)</Label>
                </div>
                {errors.is_active && <p className="text-sm font-medium text-red-500">{errors.is_active}</p>}

                <div className="flex gap-4 pt-4 border-t border-neutral-200 dark:border-neutral-800">
                    <Button type="submit" disabled={processing}>
                        {processing ? 'Saving...' : 'Update Coupon'}
                    </Button>
                    <Button type="button" variant="outline" asChild>
                        <Link href={index()}>Cancel</Link>
                    </Button>
                </div>
            </form>
        </div>
    );
}

Edit.layout = {
    breadcrumbs: [
        { title: 'Coupons', href: index() },
        { title: 'Edit', href: '#' },
    ],
};
