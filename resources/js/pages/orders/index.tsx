import { PageHeader, DataTable } from '@/components/shared';
import { Button } from '@/components/ui/button';

import { create, edit, index, show } from '@/routes/orders';
import type { Order, PaginatedType } from '@/types';
import { Link } from '@inertiajs/react';
import { Pencil, Plus, Eye } from 'lucide-react';
import { formatCurrency, formatDate } from '@/lib/utils';

export default function Index({ orders }: { orders: PaginatedType<Order> }) {
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'completed': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
            case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
            case 'cancelled': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
            default: return 'bg-neutral-100 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-400';
        }
    };

    const columns = [
        { header: 'ID', accessorKey: 'id' as keyof Order, cell: (order: Order) => <span className="font-mono">#ORD-{order.id.toString().padStart(4, '0')}</span> },
        { header: 'Customer', cell: (order: Order) => order.customer?.name || 'Unknown' },
        { header: 'Date', cell: (order: Order) => formatDate(order.date) },
        { 
            header: 'Subtotal', 
            cell: (order: Order) => <span className="font-medium">{formatCurrency(order.subtotal)}</span> 
        },
        { 
            header: 'Total', 
            cell: (order: Order) => <span className="font-medium">{formatCurrency(order.currentInvoice?.total_amount)}</span> 
        },
        { 
            header: 'Due', 
            cell: (order: Order) => <span className="font-medium text-red-600">{formatCurrency(order.currentInvoice?.due_amount)}</span> 
        },
        { 
            header: 'Status', 
            cell: (order: Order) => (
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium uppercase tracking-wider ${getStatusColor(order.status)}`}>
                    {order.status}
                </span>
            )
        },
        {
            header: 'Actions',
            className: 'text-right',
            cell: (order: Order) => (
                <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon" asChild>
                        <Link href={show(order)}>
                            <Eye className="h-4 w-4" />
                        </Link>
                    </Button>
                    <Button variant="ghost" size="icon" asChild>
                        <Link href={edit(order)}>
                            <Pencil className="h-4 w-4" />
                        </Link>
                    </Button>
                </div>
            )
        }
    ];

    return (

            <div className="flex flex-col gap-6 p-8">
                <PageHeader title="Orders" description="Manage orders and sales.">
                    <Button asChild>
                        <Link href={create()}>
                            <Plus className="mr-2 h-4 w-4" /> Create Order
                        </Link>
                    </Button>
                </PageHeader>
                
                <DataTable data={orders.data} columns={columns} />
            </div>
    );
}

Index.layout = {
    breadcrumbs: [
        { title: 'Orders', href: index() }
    ],
};
