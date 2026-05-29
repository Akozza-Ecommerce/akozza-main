import {
    PageHeader,
    DataTable,
    StatusBadge,
    DeleteDialog,
} from '@/components/shared';
import { Button } from '@/components/ui/button';

import { create, destroy, edit, index, show } from '@/routes/coupons';
import type { Coupon, PaginatedType } from '@/types';
import { Link, router } from '@inertiajs/react';
import { Pencil, Plus, Trash2, Eye } from 'lucide-react';
import { useState } from 'react';
import { formatCurrency, formatDate } from '@/lib/utils';

export default function Index({ coupons }: { coupons: PaginatedType<Coupon> }) {
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [couponToDelete, setCouponToDelete] = useState<Coupon | null>(null);

    const confirmDelete = (coupon: Coupon) => {
        setCouponToDelete(coupon);
        setDeleteModalOpen(true);
    };

    const handleDelete = () => {
        if (!couponToDelete) return;
        router.delete(destroy(couponToDelete), {
            onSuccess: () => setDeleteModalOpen(false),
        });
    };

    const columns = [
        {
            header: 'Code',
            accessorKey: 'code' as keyof Coupon,
            cell: (coupon: Coupon) => (
                <span className="rounded bg-neutral-100 px-2 py-1 font-mono dark:bg-neutral-800">
                    {coupon.code}
                </span>
            ),
        },
        {
            header: 'Discount',
            cell: (coupon: Coupon) =>
                coupon.type === 'percentage'
                    ? `${coupon.value}%`
                    : formatCurrency(coupon.value),
        },
        {
            header: 'Min. Amount',
            cell: (coupon: Coupon) =>
                coupon.minimum_invoice_amount
                    ? formatCurrency(coupon.minimum_invoice_amount)
                    : 'None',
        },
        {
            header: 'Limit',
            cell: (coupon: Coupon) => coupon.limit,
        },
        {
            header: 'Valid From',
            cell: (coupon: Coupon) =>
                coupon.start_date ? formatDate(coupon.start_date) : 'N/A',
        },
        {
            header: 'Valid Until',
            cell: (coupon: Coupon) =>
                coupon.end_date ? formatDate(coupon.end_date) : 'N/A',
        },
        {
            header: 'Status',
            cell: (coupon: Coupon) => (
                <StatusBadge status={!!coupon.is_active} />
            ),
        },
        {
            header: 'Actions',
            className: 'text-right',
            cell: (coupon: Coupon) => (
                <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon" asChild>
                        <Link href={show(coupon)}>
                            <Eye className="h-4 w-4" />
                        </Link>
                    </Button>
                    <Button variant="ghost" size="icon" asChild>
                        <Link href={edit(coupon)}>
                            <Pencil className="h-4 w-4" />
                        </Link>
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => confirmDelete(coupon)}
                        className="text-destructive hover:text-destructive"
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <div className="flex flex-col gap-6 p-8">
            <PageHeader
                title="Coupons"
                description="Manage discount codes and promotional offers."
            >
                <Button asChild>
                    <Link href={create()}>
                        <Plus className="mr-2 h-4 w-4" /> Add Coupon
                    </Link>
                </Button>
            </PageHeader>

            <DataTable data={coupons.data} columns={columns} />

            <DeleteDialog
                open={deleteModalOpen}
                onOpenChange={setDeleteModalOpen}
                onConfirm={handleDelete}
                title="Delete Coupon"
                description={`Are you sure you want to delete coupon ${couponToDelete?.code}? This action cannot be undone.`}
            />
        </div>
    );
}

Index.layout = {
    breadcrumbs: [
        {
            title: 'Coupons',
            href: index(),
        },
    ],
};
