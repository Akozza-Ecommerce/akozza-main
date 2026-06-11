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

import { edit, index, show } from '@/routes/invoices';
import type { Invoice } from '@/types';
import { Link } from '@inertiajs/react';
import { formatCurrency, formatDate } from '@/lib/utils';
import { Pencil, Printer, Download } from 'lucide-react';

export default function Show({ invoice }: { invoice: Invoice }) {
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'paid':
                return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
            case 'unpaid':
                return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
            case 'partially_paid':
                return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
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
                    title={`Invoice #INV-${invoice.number}`}
                    description="View complete billing details."
                />

                <div className="flex gap-2">
                    <Button variant="outline" onClick={() => window.print()}>
                        <Printer className="mr-2 h-4 w-4" /> Print
                    </Button>
                </div>
            </div>

            <div
                className="rounded-xl border bg-card p-8 text-card-foreground shadow-sm print:border-none print:shadow-none"
                id="invoice-printable"
            >

                {/* Details grid */}
                <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-2">
                    <div>
                        <h3 className="mb-2 text-sm font-medium tracking-wider text-muted-foreground uppercase">
                            Billed To
                        </h3>
                        <p className="text-lg font-semibold">
                            {invoice.customer?.name}
                        </p>
                        <p className="text-muted-foreground">
                            {invoice.customer?.phone_number}
                        </p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <h3 className="mb-2 text-sm font-medium tracking-wider text-muted-foreground uppercase">
                                Invoice Date
                            </h3>
                            <p className="font-medium">
                                {formatDate(invoice.date)}
                            </p>
                        </div>
                        {invoice.payments && (
                            <div>
                                <h3 className="mb-2 text-sm font-medium tracking-wider text-muted-foreground uppercase">
                                    Payment Methods
                                </h3>
                                <p className="font-medium">
                                    {invoice.payments?.map((payment) => payment.payment_method_name).join(', ')}
                                </p>
                            </div>
                        )}
                        {invoice.coupon && (
                            <div className="col-span-2 mt-2">
                                <h3 className="mb-2 text-sm font-medium tracking-wider text-muted-foreground uppercase">
                                    Coupon Applied
                                </h3>
                                <p className="font-medium">
                                    {invoice.coupon.code}
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
                            {invoice.order.items?.map((item) => (
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
                        {invoice.note && (
                            <>
                                <h3 className="mb-2 text-sm font-medium text-muted-foreground">
                                    Notes
                                </h3>
                                <p className="rounded-lg bg-muted/30 p-4 text-sm text-muted-foreground">
                                    {invoice.note}
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
                                    {formatCurrency(invoice.subtotal)}
                                </span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">
                                    Discount
                                </span>
                                <span className="font-medium text-red-500">
                                    -{formatCurrency(invoice.discount_amount)}
                                </span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">
                                    Coupon Amount
                                </span>
                                <span className="font-medium text-red-500">
                                    -{formatCurrency(invoice.coupon_amount)}
                                </span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">
                                    Tax
                                </span>
                                <span className="font-medium">
                                    {formatCurrency(invoice.tax_amount)}
                                </span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">
                                    Paid Amount
                                </span>
                                <span className="font-medium text-green-600">
                                    {formatCurrency(invoice.paid_amount)}
                                </span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">
                                    Due Amount
                                </span>
                                <span className="font-medium">
                                    {formatCurrency(invoice.due_amount)}
                                </span>
                            </div>
                            <div className="mt-3 flex justify-between border-t border-neutral-200 pt-3 dark:border-neutral-800">
                                <span className="font-bold">Total</span>
                                <span className="text-xl font-bold">
                                    {formatCurrency(invoice.total_amount)}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

Show.layout = {
    breadcrumbs: [
        { title: 'Invoices', href: index() },
        { title: 'Details', href: '#' },
    ],
};
