import { PageHeader, DataTable, StatusBadge, DeleteDialog } from '@/components/shared';
import { Button } from '@/components/ui/button';

import { create, destroy, edit, index } from '@/routes/payment-methods';
import type { PaymentMethod, PaginatedType } from '@/types';
import { Link, router } from '@inertiajs/react';
import { Pencil, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';

export default function Index({ paymentMethods }: { paymentMethods: PaginatedType<PaymentMethod> }) {
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [methodToDelete, setMethodToDelete] = useState<PaymentMethod | null>(null);

    const confirmDelete = (method: PaymentMethod) => {
        setMethodToDelete(method);
        setDeleteModalOpen(true);
    };

    const handleDelete = () => {
        if (!methodToDelete) return;
        router.delete(destroy(methodToDelete), {
            onSuccess: () => setDeleteModalOpen(false),
        });
    };

    const columns = [
        { header: 'ID', accessorKey: 'id' as keyof PaymentMethod },
        { header: 'Name', accessorKey: 'name' as keyof PaymentMethod },
        { 
            header: 'Default', 
            cell: (method: PaymentMethod) => <StatusBadge status={!!method.is_default} trueText="Yes" falseText="No" /> 
        },
        { 
            header: 'Status', 
            cell: (method: PaymentMethod) => <StatusBadge status={!!method.is_active} /> 
        },
        {
            header: 'Actions',
            className: 'text-right',
            cell: (method: PaymentMethod) => (
                <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon" asChild>
                        <Link href={edit(method)}>
                            <Pencil className="h-4 w-4" />
                        </Link>
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => confirmDelete(method)} className="text-destructive hover:text-destructive">
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
            )
        }
    ];

    return (
        <div className="flex flex-col gap-6 p-8">
                <PageHeader title="Payment Methods" description="Manage your supported payment methods.">
                    <Button asChild>
                        <Link href={create()}>
                            <Plus className="mr-2 h-4 w-4" /> Add Payment Method
                        </Link>
                    </Button>
                </PageHeader>
                
                <DataTable data={paymentMethods.data} columns={columns} />

                <DeleteDialog
                    open={deleteModalOpen}
                    onOpenChange={setDeleteModalOpen}
                    onConfirm={handleDelete}
                    title="Delete Payment Method"
                    description={`Are you sure you want to delete ${methodToDelete?.name}? This action cannot be undone.`}
                />
        </div>
    );
}

Index.layout = {
    breadcrumbs: [
        {
            title: 'Payment Methods',
            href: index(),
        },
    ],
};
