import { PageHeader, DataTable, StatusBadge, DeleteDialog } from '@/components/shared';
import { Button } from '@/components/ui/button';

import { create, destroy, edit, index, show } from '@/routes/products';
import type { Product, PaginatedType } from '@/types';
import { Link, router } from '@inertiajs/react';
import { Pencil, Plus, Trash2, Eye } from 'lucide-react';
import { useState } from 'react';
import { formatCurrency } from '@/lib/utils';

export default function Index({ products }: { products: PaginatedType<Product> }) {
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [productToDelete, setProductToDelete] = useState<Product | null>(null);

    const confirmDelete = (product: Product) => {
        setProductToDelete(product);
        setDeleteModalOpen(true);
    };

    const handleDelete = () => {
        if (!productToDelete) return;
        router.delete(destroy(productToDelete), {
            onSuccess: () => setDeleteModalOpen(false),
        });
    };

    const columns = [
        { header: 'Barcode', accessorKey: 'barcode' as keyof Product },
        { header: 'Name', accessorKey: 'name' as keyof Product },
        { 
            header: 'Category', 
            cell: (product: Product) => product.category?.name 
        },
        { 
            header: 'Price', 
            cell: (product: Product) => formatCurrency(product.price) 
        },
        { header: 'Qty', accessorKey: 'qty' as keyof Product },
        { 
            header: 'Status', 
            cell: (product: Product) => <StatusBadge status={!!product.is_active} /> 
        },
        {
            header: 'Actions',
            className: 'text-right',
            cell: (product: Product) => (
                <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon" asChild>
                        <Link href={show(product)}>
                            <Eye className="h-4 w-4" />
                        </Link>
                    </Button>
                    <Button variant="ghost" size="icon" asChild>
                        <Link href={edit(product)}>
                            <Pencil className="h-4 w-4" />
                        </Link>
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => confirmDelete(product)} className="text-destructive hover:text-destructive">
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
            )
        }
    ];

    return (
        <div className="flex flex-col gap-6 p-8">
                <PageHeader title="Products" description="Manage your product inventory.">
                    <Button asChild>
                        <Link href={create()}>
                            <Plus className="mr-2 h-4 w-4" /> Add Product
                        </Link>
                    </Button>
                </PageHeader>
                
                <DataTable data={products.data} columns={columns} />

                <DeleteDialog
                    open={deleteModalOpen}
                    onOpenChange={setDeleteModalOpen}
                    onConfirm={handleDelete}
                    title="Delete Product"
                    description={`Are you sure you want to delete ${productToDelete?.name}? This action cannot be undone.`}
                />
        </div>
    );
}

Index.layout = {
    breadcrumbs: [
        {
            title: 'Products',
            href: index(),
        },
    ],
};
