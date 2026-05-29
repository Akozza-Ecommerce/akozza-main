import { PageHeader, StatusBadge } from '@/components/shared';
import { Button } from '@/components/ui/button';

import { edit, index } from '@/routes/coupons';
import type { Coupon } from '@/types';
import { Link } from '@inertiajs/react';
import { formatCurrency, formatDate } from '@/lib/utils';
import { Pencil } from 'lucide-react';

const DAYS_OF_WEEK = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export default function Show({ coupon }: { coupon: Coupon }) {
    const activeDays = coupon.days?.map(d => d.day_of_week) || [];

    return (
        <div className="flex flex-col gap-6 p-8">
            <PageHeader title={`Coupon: ${coupon.code}`} description="Discount details, target rules, and limits.">
                <Button asChild>
                    <Link href={edit(coupon)}>
                        <Pencil className="mr-2 h-4 w-4" /> Edit
                    </Link>
                </Button>
            </PageHeader>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Discount Details */}
                <div className="bg-card text-card-foreground rounded-xl border shadow-sm p-6 space-y-6">
                    <div>
                        <h3 className="text-lg font-semibold border-b pb-2 border-neutral-200 dark:border-neutral-800">Discount Details</h3>
                    </div>
                    <dl className="grid grid-cols-1 gap-y-4">
                        <div>
                            <dt className="text-sm font-medium text-muted-foreground">Discount Value</dt>
                            <dd className="mt-1 text-2xl font-bold text-primary">
                                {coupon.type === 'percentage' ? `${coupon.value}%` : formatCurrency(coupon.value)}
                                <span className="text-sm font-normal text-muted-foreground ml-2">({coupon.type})</span>
                            </dd>
                        </div>
                        <div>
                            <dt className="text-sm font-medium text-muted-foreground">Usage Limit</dt>
                            <dd className="mt-1 text-base font-semibold">{coupon.limit} uses</dd>
                        </div>
                        <div>
                            <dt className="text-sm font-medium text-muted-foreground">Minimum Order Amount</dt>
                            <dd className="mt-1 text-base">
                                {coupon.minimum_invoice_amount ? formatCurrency(coupon.minimum_invoice_amount) : 'No minimum'}
                            </dd>
                        </div>
                        <div>
                            <dt className="text-sm font-medium text-muted-foreground">Status</dt>
                            <dd className="mt-1">
                                <StatusBadge status={!!coupon.is_active} />
                            </dd>
                        </div>
                        {coupon.note && (
                            <div>
                                <dt className="text-sm font-medium text-muted-foreground">Internal Note</dt>
                                <dd className="mt-1 text-sm bg-muted p-2 rounded border">{coupon.note}</dd>
                            </div>
                        )}
                    </dl>
                </div>

                {/* Validity Period */}
                <div className="bg-card text-card-foreground rounded-xl border shadow-sm p-6 space-y-6">
                    <div>
                        <h3 className="text-lg font-semibold border-b pb-2 border-neutral-200 dark:border-neutral-800">Validity Period</h3>
                    </div>
                    <dl className="grid grid-cols-1 gap-y-4">
                        <div>
                            <dt className="text-sm font-medium text-muted-foreground">Starts At</dt>
                            <dd className="mt-1 text-base font-semibold">
                                {coupon.start_date ? formatDate(coupon.start_date) : 'No start date'}
                            </dd>
                        </div>
                        <div>
                            <dt className="text-sm font-medium text-muted-foreground">Ends At</dt>
                            <dd className="mt-1 text-base font-semibold">
                                {coupon.end_date ? formatDate(coupon.end_date) : 'No end date'}
                            </dd>
                        </div>
                        <div>
                            <dt className="text-sm font-medium text-muted-foreground">Created On</dt>
                            <dd className="mt-1 text-sm text-muted-foreground">
                                {formatDate(coupon.created_at)}
                            </dd>
                        </div>
                    </dl>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Active Days */}
                <div className="bg-card text-card-foreground rounded-xl border shadow-sm p-6 space-y-4">
                    <h3 className="text-lg font-semibold border-b pb-2 border-neutral-200 dark:border-neutral-800">Applicable Days</h3>
                    {activeDays.length === 0 ? (
                        <p className="text-sm text-muted-foreground">Applicable on all days of the week.</p>
                    ) : (
                        <div className="flex flex-wrap gap-2">
                            {DAYS_OF_WEEK.map((day) => {
                                const active = activeDays.includes(day as any);
                                return (
                                    <span
                                        key={day}
                                        className={`px-3 py-1.5 rounded-full text-xs font-semibold border ${
                                            active
                                                ? 'bg-primary/10 text-primary border-primary/20'
                                                : 'bg-muted text-muted-foreground opacity-50 border-transparent'
                                        }`}
                                    >
                                        {day}
                                    </span>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* Target Scope */}
                <div className="bg-card text-card-foreground rounded-xl border shadow-sm p-6 space-y-4">
                    <h3 className="text-lg font-semibold border-b pb-2 border-neutral-200 dark:border-neutral-800">
                        Target Scope ({coupon.target === 'product' ? 'Products' : 'Categories'})
                    </h3>
                    <div className="space-y-2">
                        {coupon.targets && coupon.targets.length > 0 ? (
                            <div className="flex flex-wrap gap-2">
                                {coupon.targets.map((t, idx) => {
                                    const itemName = coupon.target === 'product' ? t.product?.name : t.category?.name;
                                    return (
                                        <span
                                            key={idx}
                                            className="px-3 py-1.5 bg-secondary text-secondary-foreground border rounded-lg text-xs font-medium"
                                        >
                                            {itemName || `ID: ${coupon.target === 'product' ? t.product_id : t.category_id}`}
                                        </span>
                                    );
                                })}
                            </div>
                        ) : (
                            <p className="text-sm text-muted-foreground">No specific targets selected (Applies to all).</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

Show.layout = {
    breadcrumbs: [
        { title: 'Coupons', href: index() },
        { title: 'Coupon Details', href: '#' },
    ],
};
