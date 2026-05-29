import { PageHeader, DataTable, DeleteDialog } from '@/components/shared';
import { Button } from '@/components/ui/button';

import { create, destroy, edit, index, show } from '@/routes/prescriptions';
import type { Prescription, PaginatedType } from '@/types';
import { Link, router } from '@inertiajs/react';
import { Pencil, Plus, Trash2, Eye } from 'lucide-react';
import { useState } from 'react';
import { formatDate } from '@/lib/utils';

export default function Index({
    prescriptions,
}: {
    prescriptions: PaginatedType<Prescription>;
}) {
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [prescriptionToDelete, setPrescriptionToDelete] =
        useState<Prescription | null>(null);

    const confirmDelete = (prescription: Prescription) => {
        setPrescriptionToDelete(prescription);
        setDeleteModalOpen(true);
    };

    const handleDelete = () => {
        if (!prescriptionToDelete) return;
        router.delete(destroy(prescriptionToDelete), {
            onSuccess: () => setDeleteModalOpen(false),
        });
    };

    const columns = [
        {
            header: 'ID',
            accessorKey: 'id' as keyof Prescription,
            cell: (p: Prescription) => (
                <span className="font-mono">
                    #PR-{p.id.toString().padStart(4, '0')}
                </span>
            ),
        },
        {
            header: 'Name',
            accessorKey: 'name' as keyof Prescription,
            cell: (p: Prescription) => p.name || 'N/A',
        },
        {
            header: 'Customer',
            cell: (p: Prescription) => p.customer?.name || 'Unknown',
        },
        { header: 'Date', cell: (p: Prescription) => formatDate(p.created_at) },
        {
            header: 'Actions',
            className: 'text-right',
            cell: (p: Prescription) => (
                <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon" asChild>
                        <Link href={show(p)}>
                            <Eye className="h-4 w-4" />
                        </Link>
                    </Button>
                    <Button variant="ghost" size="icon" asChild>
                        <Link href={edit(p)}>
                            <Pencil className="h-4 w-4" />
                        </Link>
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => confirmDelete(p)}
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
                title="Prescriptions"
                description="Manage patient prescriptions."
            >
                <Button asChild>
                    <Link href={create()}>
                        <Plus className="mr-2 h-4 w-4" /> Create Prescription
                    </Link>
                </Button>
            </PageHeader>

            <DataTable data={prescriptions.data} columns={columns} />

            <DeleteDialog
                open={deleteModalOpen}
                onOpenChange={setDeleteModalOpen}
                onConfirm={handleDelete}
                title="Delete Prescription"
                description={`Are you sure you want to delete Prescription #PR-${prescriptionToDelete?.id.toString().padStart(4, '0')}? This action cannot be undone.`}
            />
        </div>
    );
}

Index.layout = {
    breadcrumbs: [{ title: 'Prescriptions', href: index() }],
};
