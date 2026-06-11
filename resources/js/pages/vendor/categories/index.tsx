import { PageHeader, DataTable, StatusBadge, DeleteDialog } from '@/components/shared';
import { Button } from '@/components/ui/button';
import { create, destroy, edit, index, show } from '@/routes/vendor/categories';
import type { Category, PaginatedType } from '@/types';
import { Link, router } from '@inertiajs/react';
import { Pencil, Plus, Trash2, Eye } from 'lucide-react';
import { useState } from 'react';

export default function Index({ categories }: { categories: PaginatedType<Category> }) {
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(null);

    const confirmDelete = (category: Category) => {
        setCategoryToDelete(category);
        setDeleteModalOpen(true);
    };

    const handleDelete = () => {
        if (!categoryToDelete) return;
        router.delete(destroy(categoryToDelete), {
            onSuccess: () => setDeleteModalOpen(false),
        });
    };

    const columns = [
        { header: 'ID', accessorKey: 'id' as keyof Category },
        { header: 'Name', accessorKey: 'name' as keyof Category },
        {
            header: 'Status',
            cell: (category: Category) => <StatusBadge status={!!category.is_active} />
        },
        {
            header: 'Actions',
            className: 'text-right',
            cell: (category: Category) => (
                <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon" asChild>
                        <Link href={show(category)}>
                            <Eye className="h-4 w-4" />
                        </Link>
                    </Button>
                    <Button variant="ghost" size="icon" asChild>
                        <Link href={edit(category)}>
                            <Pencil className="h-4 w-4" />
                        </Link>
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => confirmDelete(category)} className="text-destructive hover:text-destructive">
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
            )
        }
    ];

    return (
        <div className="flex flex-col gap-6 p-8">
            <PageHeader title="Categories" description="Manage categories for your store products.">
                <Button asChild>
                    <Link href={create()}>
                        <Plus className="mr-2 h-4 w-4" /> Add Category
                    </Link>
                </Button>
            </PageHeader>
            
            <DataTable data={categories.data} columns={columns} />

            <DeleteDialog
                open={deleteModalOpen}
                onOpenChange={setDeleteModalOpen}
                onConfirm={handleDelete}
                title="Delete Category"
                description={`Are you sure you want to delete ${categoryToDelete?.name}? This action cannot be undone.`}
            />
        </div>
    );
}

Index.layout = {
    breadcrumbs: [
        {
            title: 'Categories',
            href: index(),
        },
    ],
};
