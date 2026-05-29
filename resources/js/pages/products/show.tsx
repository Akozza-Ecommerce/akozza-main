import { PageHeader, StatusBadge } from '@/components/shared';
import { Button } from '@/components/ui/button';

import { edit, index, show } from '@/routes/products';
import type { Product } from '@/types';
import { Link } from '@inertiajs/react';
import { formatCurrency, formatDate } from '@/lib/utils';
import { Pencil } from 'lucide-react';

export default function Show({ product }: { product: Product }) {
    const margin = product.price - product.cost;
    const marginPercent = product.cost > 0 ? (margin / product.cost) * 100 : 0;

    return (
        <div className="flex flex-col gap-6 p-8">
                <PageHeader title={product.name} description="Product details and pricing information.">
                    <Button asChild>
                        <Link href={edit(product)}>
                            <Pencil className="mr-2 h-4 w-4" /> Edit
                        </Link>
                    </Button>
                </PageHeader>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-card text-card-foreground rounded-xl border shadow-sm p-6 col-span-2">
                        <h3 className="text-lg font-semibold mb-6 border-b pb-2 border-neutral-200 dark:border-neutral-800">Basic Info</h3>
                        <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                            <div className="sm:col-span-1">
                                <dt className="text-sm font-medium text-muted-foreground">Barcode</dt>
                                <dd className="mt-1 text-sm font-mono bg-neutral-100 dark:bg-neutral-800 px-2 py-1 rounded inline-block">{product.barcode}</dd>
                            </div>
                            <div className="sm:col-span-1">
                                <dt className="text-sm font-medium text-muted-foreground">Category</dt>
                                <dd className="mt-1 text-sm">{product.category?.name}</dd>
                            </div>
                            <div className="sm:col-span-1">
                                <dt className="text-sm font-medium text-muted-foreground">Status</dt>
                                <dd className="mt-1 text-sm">
                                    <StatusBadge status={!!product.is_active} />
                                </dd>
                            </div>
                            <div className="sm:col-span-1">
                                <dt className="text-sm font-medium text-muted-foreground">Added On</dt>
                                <dd className="mt-1 text-sm">{formatDate(product.created_at)}</dd>
                            </div>
                        </dl>
                    </div>

                    <div className="bg-card text-card-foreground rounded-xl border shadow-sm p-6">
                        <h3 className="text-lg font-semibold mb-6 border-b pb-2 border-neutral-200 dark:border-neutral-800">Inventory & Pricing</h3>
                        <dl className="grid grid-cols-1 gap-y-6">
                            <div>
                                <dt className="text-sm font-medium text-muted-foreground">Stock Quantity</dt>
                                <dd className={`mt-1 text-2xl font-semibold ${product.qty < 5 ? 'text-red-500' : ''}`}>
                                    {product.qty}
                                </dd>
                            </div>
                            <div>
                                <dt className="text-sm font-medium text-muted-foreground">Selling Price</dt>
                                <dd className="mt-1 text-xl font-medium">{formatCurrency(product.price)}</dd>
                            </div>
                            <div>
                                <dt className="text-sm font-medium text-muted-foreground">Unit Cost</dt>
                                <dd className="mt-1 text-sm">{formatCurrency(product.cost)}</dd>
                            </div>
                            <div>
                                <dt className="text-sm font-medium text-muted-foreground">Profit Margin</dt>
                                <dd className="mt-1 text-sm">
                                    <span className="font-medium text-green-600 dark:text-green-400">{formatCurrency(margin)}</span>
                                    <span className="text-muted-foreground ml-2">({marginPercent.toFixed(1)}%)</span>
                                </dd>
                            </div>
                        </dl>
                    </div>
                </div>
        </div>
    );
}

Show.layout = {
    breadcrumbs: [
        { title: 'Products', href: index() },
        { title: 'Product Details', href: '#' },
    ],
};
