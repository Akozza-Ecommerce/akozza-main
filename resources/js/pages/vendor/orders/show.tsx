import { PageHeader } from '@/components/shared';
import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
    TableFooter,
} from '@/components/ui/table';

import { edit, index, show } from '@/routes/orders';
import { show as showInvoice } from '@/routes/invoices';
import type { Order } from '@/types';
import { Link } from '@inertiajs/react';
import { formatCurrency, formatDate } from '@/lib/utils';
import { Pencil, Printer, Download, Eye } from 'lucide-react';

export default function Show({ order }: { order: Order }) {
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'completed':
                return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
            case 'pending':
                return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
            case 'cancelled':
                return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
            default:
                return 'bg-neutral-100 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-400';
        }
    };    

    return (
        <div className="flex flex-col gap-6 p-8">
            <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                <PageHeader
                    title={`Order #ORD-${order.number}`}
                    description="View complete order details."
                />

                <div className="flex gap-2">
                    <Button variant="outline" asChild>
                        <Link href={edit(order)}>
                            <Pencil className="mr-2 h-4 w-4" /> Edit
                        </Link>
                    </Button>
                    <Button variant="outline" onClick={() => window.print()}>
                        <Printer className="mr-2 h-4 w-4" /> Print
                    </Button>
                </div>
            </div>

            <div
                className="rounded-xl border bg-card p-8 text-card-foreground shadow-sm print:border-none print:shadow-none"
                id="order-printable"
            >

                {/* Details grid */}
                <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-2">
                    <div>
                        <h3 className="mb-2 text-sm font-medium tracking-wider text-muted-foreground uppercase">
                            Customer
                        </h3>
                        <p className="text-lg font-semibold">
                            {order.customer?.name}
                        </p>
                        <p className="text-muted-foreground">
                            {order.customer?.phone_number}
                        </p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <h3 className="mb-2 text-sm font-medium tracking-wider text-muted-foreground uppercase">
                                Order Date
                            </h3>
                            <p className="font-medium">
                                {formatDate(order.date)}
                            </p>
                        </div>
                        <div>
                            <h3 className="mb-2 text-sm font-medium tracking-wider text-muted-foreground uppercase">
                                Status
                            </h3>
                            <p className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium uppercase tracking-wider ${getStatusColor(order.status)}`}>
                                {order.status}
                            </p>
                        </div>
                        {order.currentInvoice?.payments && (
                            <div>
                                <h3 className="mb-2 text-sm font-medium tracking-wider text-muted-foreground uppercase">
                                    Payment Methods
                                </h3>
                                <p className="font-medium">
                                    {order.currentInvoice?.payments?.map((payment) => payment.payment_method_name).join(', ')}
                                </p>
                            </div>
                        )}
                        {order.currentInvoice?.coupon && (
                            <div className="col-span-2 mt-2">
                                <h3 className="mb-2 text-sm font-medium tracking-wider text-muted-foreground uppercase">
                                    Coupon Applied
                                </h3>
                                <p className="font-medium">
                                    {order.currentInvoice?.coupon.code}
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Items Table */}
                <div className="mb-12 overflow-hidden rounded-lg border">
                    <Table>
                        <TableHeader className="bg-muted/50">
                            <TableRow>
                                <TableHead className="w-[40%]">
                                    Item Description
                                </TableHead>
                                <TableHead className="text-center">
                                    Qty
                                </TableHead>
                                <TableHead className="text-right">
                                    Unit Price
                                </TableHead>
                                <TableHead className="text-right">
                                    Total
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {order.items.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell className="font-medium">
                                        {item.product?.name ||
                                            `Product #${item.product?.barcode}`}
                                    </TableCell>
                                    <TableCell className="text-center">
                                        {item.quantity}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        {formatCurrency(item.unit_price)}
                                    </TableCell>
                                    <TableCell className="text-right font-medium">
                                        {formatCurrency(item.total_amount)}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>

                {/* Totals */}
                <div className="mb-8 flex flex-col justify-between gap-8 md:flex-row">
                    <div className="w-full md:w-1/2">
                        {order.note && (
                            <>
                                <h3 className="mb-2 text-sm font-medium text-muted-foreground">
                                    Notes
                                </h3>
                                <p className="rounded-lg bg-muted/30 p-4 text-sm text-muted-foreground">
                                    {order.note}
                                </p>
                            </>
                        )}
                    </div>
                    <div className="w-full md:w-75">
                        <div className="space-y-3">
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">
                                    Subtotal
                                </span>
                                <span className="font-medium">
                                    {formatCurrency(order.subtotal)}
                                </span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">
                                    Discount
                                </span>
                                <span className="font-medium text-red-500">
                                    -{formatCurrency(order.currentInvoice?.discount_amount)}
                                </span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">
                                    Coupon Amount
                                </span>
                                <span className="font-medium text-red-500">
                                    -{formatCurrency(order.currentInvoice?.coupon_amount)}
                                </span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">
                                    Tax
                                </span>
                                <span className="font-medium">
                                    {formatCurrency(order.currentInvoice?.tax_amount)}
                                </span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">
                                    Paid Amount
                                </span>
                                <span className="font-medium text-green-600">
                                    {formatCurrency(order.currentInvoice?.paid_amount)}
                                </span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">
                                    Due Amount
                                </span>
                                <span className="font-medium">
                                    {formatCurrency(order.currentInvoice?.due_amount)}
                                </span>
                            </div>
                            <div className="mt-3 flex justify-between border-t border-neutral-200 pt-3 dark:border-neutral-800">
                                <span className="font-bold">Total</span>
                                <span className="text-xl font-bold">
                                    {formatCurrency(order.currentInvoice?.total_amount)}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Invoices Table */}
                {order.invoices && order.invoices.length > 0 && (
                    <div className="overflow-hidden rounded-lg border">
                        <h3 className="border-b px-6 py-4 text-lg font-semibold">
                            Order Invoices
                        </h3>
                        <Table>
                            <TableHeader className="bg-muted/50">
                                <TableRow>
                                    <TableHead>Invoice #</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Total</TableHead>
                                    <TableHead className="text-right">Paid</TableHead>
                                    <TableHead className="text-right">Due</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {order.invoices.map((invoice) => (
                                    <TableRow
                                        key={invoice.id}
                                        className={
                                            invoice.id === order.currentInvoice?.id
                                                ? 'bg-green-50 dark:bg-green-900/20'
                                                : ''
                                        }
                                    >
                                        <TableCell className="font-medium">
                                            INV-{invoice.number}
                                            {invoice.id === order.currentInvoice?.id && (
                                                <span className="ml-2 text-xs font-medium text-green-600">
                                                    (Current)
                                                </span>
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            {formatDate(invoice.date)}
                                        </TableCell>
                                        <TableCell>
                                            <span
                                                className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium uppercase tracking-wider ${invoice.id === order.currentInvoice?.id ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : 'bg-neutral-100 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-400'}`}
                                            >
                                                {invoice.status}
                                            </span>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            {formatCurrency(invoice.total_amount)}
                                        </TableCell>
                                        <TableCell className="text-right text-green-600">
                                            {formatCurrency(invoice.paid_amount)}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            {formatCurrency(invoice.due_amount)}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                asChild
                                            >
                                                <Link href={showInvoice(invoice)}>
                                                    <Eye className="h-4 w-4" />
                                                </Link>
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                )}
            </div>
        </div>
    );
}

Show.layout = {
    breadcrumbs: [
        { title: 'Orders', href: index() },
        { title: 'Details', href: '#' },
    ],
};
