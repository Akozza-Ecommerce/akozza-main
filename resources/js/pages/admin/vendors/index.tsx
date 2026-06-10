import { PageHeader, DataTable, DeleteDialog } from '@/components/shared';
import { Button } from '@/components/ui/button';

import { create, destroy, edit, index, show } from '@/routes/admin/vendors';
import type { PaginatedType, Vendor } from '@/types';
import { Link, router } from '@inertiajs/react';
import { Pencil, Plus, Trash2, Eye } from 'lucide-react';
import { useState } from 'react';

interface IndexProps {
    vendors: PaginatedType<Vendor>;
}

export default function Index({ vendors }: IndexProps) {
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [vendorToDelete, setVendorToDelete] = useState<Vendor | null>(null);

    const confirmDelete = (vendor: Vendor) => {
        setVendorToDelete(vendor);
        setDeleteModalOpen(true);
    };

    const handleDelete = () => {
        if (!vendorToDelete) return;
        router.delete(destroy(vendorToDelete.id), {
            onSuccess: () => setDeleteModalOpen(false),
        });
    };

    const columns = [
        { header: 'ID', accessorKey: 'id' as keyof Vendor },
        { header: 'Name', accessorKey: 'name' as keyof Vendor },
        { header: 'Username', accessorKey: 'username' as keyof Vendor },
        { header: 'Email', accessorKey: 'email' as keyof Vendor },
        { header: 'Type', accessorKey: 'type' as keyof Vendor },
        { header: 'Created', accessorKey: 'created_at' as keyof Vendor },
        {
            header: 'Actions',
            className: 'text-right',
            cell: (vendor: Vendor) => (
                <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon" asChild>
                        <Link href={show(vendor.id)}>
                            <Eye className="h-4 w-4" />
                        </Link>
                    </Button>
                    <Button variant="ghost" size="icon" asChild>
                        <Link href={edit(vendor.id)}>
                            <Pencil className="h-4 w-4" />
                        </Link>
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => confirmDelete(vendor)}
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
                title="Vendors"
                description="Manage vendor accounts and marketplace partners."
            >
                <Button asChild>
                    <Link href={create()}>
                        <Plus className="mr-2 h-4 w-4" /> Add Vendor
                    </Link>
                </Button>
            </PageHeader>

            <DataTable data={vendors.data} columns={columns} />

            <DeleteDialog
                open={deleteModalOpen}
                onOpenChange={setDeleteModalOpen}
                onConfirm={handleDelete}
                title="Delete Vendor"
                description={`Are you sure you want to delete vendor ${vendorToDelete?.name}? This action cannot be undone.`}
            />
        </div>
    );
}

Index.layout = {
    breadcrumbs: [
        {
            title: 'Vendors',
            href: index(),
        },
    ],
};