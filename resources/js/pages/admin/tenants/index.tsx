import { PageHeader, DataTable, DeleteDialog } from '@/components/shared';
import { Button } from '@/components/ui/button';
import { create, destroy, edit, index, show } from '@/routes/admin/tenants';
import type { PaginatedType, Tenant } from '@/types';
import { Link, router } from '@inertiajs/react';
import { Pencil, Plus, Trash2, Eye } from 'lucide-react';
import { useState } from 'react';

interface IndexProps {
    tenants: PaginatedType<Tenant>;
}

export default function Index({ tenants }: IndexProps) {
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [tenantToDelete, setTenantToDelete] = useState<Tenant | null>(null);

    const confirmDelete = (tenant: Tenant) => {
        setTenantToDelete(tenant);
        setDeleteModalOpen(true);
    };

    const handleDelete = () => {
        if (!tenantToDelete) return;

        router.delete(destroy(tenantToDelete.id), {
            onSuccess: () => setDeleteModalOpen(false),
        });
    };

    const columns = [
        { header: 'ID', accessorKey: 'id' as keyof Tenant },
        { header: 'Name', accessorKey: 'name' as keyof Tenant },
        { header: 'Owner ID', accessorKey: 'owner_id' as keyof Tenant },
        { header: 'Created', accessorKey: 'created_at' as keyof Tenant },
        {
            header: 'Actions',
            className: 'text-right',
            cell: (tenant: Tenant) => (
                <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon" asChild>
                        <Link href={show(tenant.id)}>
                            <Eye className="h-4 w-4" />
                        </Link>
                    </Button>
                    <Button variant="ghost" size="icon" asChild>
                        <Link href={edit(tenant.id)}>
                            <Pencil className="h-4 w-4" />
                        </Link>
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => confirmDelete(tenant)}
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
                title="Tenants"
                description="Manage tenant accounts and marketplace tenants."
            >
                <Button asChild>
                    <Link href={create()}>
                        <Plus className="mr-2 h-4 w-4" /> Add Tenant
                    </Link>
                </Button>
            </PageHeader>

            <DataTable data={tenants.data} columns={columns} />

            <DeleteDialog
                open={deleteModalOpen}
                onOpenChange={setDeleteModalOpen}
                onConfirm={handleDelete}
                title="Delete Tenant"
                description={`Are you sure you want to delete tenant ${tenantToDelete?.name}? This action cannot be undone.`}
            />
        </div>
    );
}

Index.layout = {
    breadcrumbs: [
        {
            title: 'Tenants',
            href: index(),
        },
    ],
};
