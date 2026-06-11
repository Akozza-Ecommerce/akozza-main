import { PageHeader, DataTable, DeleteDialog } from '@/components/shared';
import { Button } from '@/components/ui/button';
import { create, destroy, edit, index, show } from '@/routes/vendor/stores';
import type { PaginatedType, Store } from '@/types';
import { Link, router } from '@inertiajs/react';
import { Pencil, Plus, Trash2, Eye } from 'lucide-react';
import { useState } from 'react';

interface IndexProps {
    stores: PaginatedType<Store>;
}

export default function Index({ stores }: IndexProps) {
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [storeToDelete, setStoreToDelete] = useState<Store | null>(null);

    const confirmDelete = (store: Store) => {
        setStoreToDelete(store);
        setDeleteModalOpen(true);
    };

    const handleDelete = () => {
        if (!storeToDelete) return;

        router.delete(destroy(storeToDelete.id), {
            onSuccess: () => setDeleteModalOpen(false),
        });
    };

    const columns = [
        { header: 'ID', accessorKey: 'id' as keyof Store },
        { header: 'Name', accessorKey: 'name' as keyof Store },
        { header: 'Slug', accessorKey: 'slug' as keyof Store },
        { header: 'Created', accessorKey: 'created_at' as keyof Store },
        {
            header: 'Actions',
            className: 'text-right',
            cell: (store: Store) => (
                <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon" asChild>
                        <Link href={show(store.id)}>
                            <Eye className="h-4 w-4" />
                        </Link>
                    </Button>
                    <Button variant="ghost" size="icon" asChild>
                        <Link href={edit(store.id)}>
                            <Pencil className="h-4 w-4" />
                        </Link>
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => confirmDelete(store)}
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
                title="Stores"
                description="Manage your stores."
            >
                <Button asChild>
                    <Link href={create()}>
                        <Plus className="mr-2 h-4 w-4" /> Add Store
                    </Link>
                </Button>
            </PageHeader>

            <DataTable data={stores.data} columns={columns} />

            <DeleteDialog
                open={deleteModalOpen}
                onOpenChange={setDeleteModalOpen}
                onConfirm={handleDelete}
                title="Delete Store"
                description={`Are you sure you want to delete store ${storeToDelete?.name}? This action cannot be undone.`}
            />
        </div>
    );
}

Index.layout = {
    breadcrumbs: [
        {
            title: 'Stores',
            href: index(),
        },
    ],
};
