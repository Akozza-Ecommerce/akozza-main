import { PageHeader, DataTable, DeleteDialog } from '@/components/shared';
import { Button } from '@/components/ui/button';

import { create, destroy, edit, index, show } from '@/routes/customers';
import type { Customer, PaginatedType } from '@/types';
import { Link, router } from '@inertiajs/react';
import { Pencil, Plus, Trash2, Eye } from 'lucide-react';
import { useState } from 'react';

export default function Index({
    customers,
}: {
    customers: PaginatedType<Customer>;
}) {
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [customerToDelete, setCustomerToDelete] = useState<Customer | null>(
        null,
    );

    console.log(customers);

    const confirmDelete = (customer: Customer) => {
        setCustomerToDelete(customer);
        setDeleteModalOpen(true);
    };

    const handleDelete = () => {
        if (!customerToDelete) return;
        router.delete(destroy(customerToDelete), {
            onSuccess: () => setDeleteModalOpen(false),
        });
    };

    const columns = [
        { header: 'ID', accessorKey: 'id' as keyof Customer },
        { header: 'Name', accessorKey: 'name' as keyof Customer },
        { header: 'Phone', accessorKey: 'phone_number' as keyof Customer },
        { header: 'Points', accessorKey: 'points' as keyof Customer },
        {
            header: 'Actions',
            className: 'text-center',
            cell: (customer: Customer) => (
                <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon" asChild>
                        <Link href={show(customer)}>
                            <Eye className="h-4 w-4" />
                        </Link>
                    </Button>
                    <Button variant="ghost" size="icon" asChild>
                        <Link href={edit(customer)}>
                            <Pencil className="h-4 w-4" />
                        </Link>
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => confirmDelete(customer)}
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
                title="Customers"
                description="Manage your customer base."
            >
                <Button asChild>
                    <Link href={create()}>
                        <Plus className="mr-2 h-4 w-4" /> Add Customer
                    </Link>
                </Button>
            </PageHeader>

            <DataTable data={customers.data} columns={columns} />

            <DeleteDialog
                open={deleteModalOpen}
                onOpenChange={setDeleteModalOpen}
                onConfirm={handleDelete}
                title="Delete Customer"
                description={`Are you sure you want to delete ${customerToDelete?.name}? This action cannot be undone.`}
            />
        </div>
    );
}

Index.layout = {
    breadcrumbs: [
        {
            title: 'Customers',
            href: index(),
        },
    ],
};
