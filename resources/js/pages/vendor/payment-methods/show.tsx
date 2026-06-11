import { PageHeader, StatusBadge } from '@/components/shared';
import { Button } from '@/components/ui/button';

import { edit, index } from '@/routes/vendor/payment-methods';
import type { PaymentMethod } from '@/types';
import { Link } from '@inertiajs/react';
import { formatDate } from '@/lib/utils';
import { Pencil } from 'lucide-react';

export default function Show({ paymentMethod }: { paymentMethod: PaymentMethod }) {
    return (

            <div className="flex flex-col gap-6 p-8">
                <PageHeader title={paymentMethod.name} description="Payment method details.">
                    <Button asChild>
                        <Link href={edit(paymentMethod)}>
                            <Pencil className="mr-2 h-4 w-4" /> Edit
                        </Link>
                    </Button>
                </PageHeader>

                <div className="bg-card text-card-foreground rounded-xl border shadow-sm p-6">
                    <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                        <div className="sm:col-span-1">
                            <dt className="text-sm font-medium text-muted-foreground">Name</dt>
                            <dd className="mt-1 text-sm">{paymentMethod.name}</dd>
                        </div>
                        <div className="sm:col-span-1">
                            <dt className="text-sm font-medium text-muted-foreground">Default Method</dt>
                            <dd className="mt-1 text-sm">
                                <StatusBadge status={!!paymentMethod.is_default} trueText="Yes" falseText="No" />
                            </dd>
                        </div>
                        <div className="sm:col-span-1">
                            <dt className="text-sm font-medium text-muted-foreground">Status</dt>
                            <dd className="mt-1 text-sm">
                                <StatusBadge status={!!paymentMethod.is_active} />
                            </dd>
                        </div>
                        <div className="sm:col-span-1">
                            <dt className="text-sm font-medium text-muted-foreground">Created At</dt>
                            <dd className="mt-1 text-sm">{formatDate(paymentMethod.created_at)}</dd>
                        </div>
                    </dl>
                </div>
            </div>
    );
}

Show.layout = {
    breadcrumbs: [
        { title: 'Payment Methods', href: index() },
        { title: 'Details', href: '#' }
    ],
};
