import { PageHeader, DataTable } from '@/components/shared';
import { Button } from '@/components/ui/button';

import { create, edit, index, show } from '@/routes/invoices';
import type { Invoice, PaginatedType } from '@/types';
import { Link } from '@inertiajs/react';
import { Pencil, Plus, Eye } from 'lucide-react';
import { formatCurrency, formatDate } from '@/lib/utils';

export default function Index({ invoices }: { invoices: PaginatedType<Invoice> }) {
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'paid': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
            case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
            case 'cancelled': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
            default: return 'bg-neutral-100 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-400';
        }
    };

    const columns = [
        { header: 'ID', accessorKey: 'id' as keyof Invoice, cell: (invoice: Invoice) => <span className="font-mono">#INV-{invoice.id.toString().padStart(4, '0')}</span> },
        { header: 'Customer', cell: (invoice: Invoice) => invoice.customer?.name || 'Unknown' },
        { header: 'Date', cell: (invoice: Invoice) => formatDate(invoice.date) },
        { 
            header: 'Total', 
            cell: (invoice: Invoice) => <span className="font-medium">{formatCurrency(invoice.total_amount)}</span> 
        },
        { 
            header: 'Status', 
            cell: (invoice: Invoice) => (
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium uppercase tracking-wider ${getStatusColor(invoice.status)}`}>
                    {invoice.status}
                </span>
            )
        },
        {
            header: 'Actions',
            className: 'text-right',
            cell: (invoice: Invoice) => (
                <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon" asChild>
                        <Link href={show(invoice)}>
                            <Eye className="h-4 w-4" />
                        </Link>
                    </Button>
                </div>
            )
        }
    ];

    return (
            <div className="flex flex-col gap-6 p-8">
                <DataTable data={invoices.data} columns={columns} />
            </div>
    );
}

Index.layout = {
    breadcrumbs: [
        { title: 'Invoices', href: index() }
    ],
};
