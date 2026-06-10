import { PageHeader } from '@/components/shared';
import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';
import { index } from '@/routes/admin/vendors';
import type { Vendor } from '@/types';
import { formatDate } from '@/lib/utils';
import { Pencil } from 'lucide-react';
import { edit } from '@/actions/App/Http/Controllers/Admin/VendorController';

export default function Show({ vendor }: { vendor: Vendor }) {
    return (
        <div className="flex flex-col gap-6 p-8">
            <PageHeader
                title={vendor.name}
                description="Vendor profile details and account information."
            >
                <Button asChild>
                    <Link href={edit(vendor)}>
                        <Pencil className="mr-2 h-4 w-4" /> Edit
                    </Link>
                </Button>
            </PageHeader>

            <div className="grid gap-6 lg:grid-cols-2">
                <div className="rounded-xl border bg-card p-6 shadow-sm">
                    <h3 className="text-lg font-semibold mb-4">Vendor Information</h3>
                    <dl className="grid gap-y-4">
                        <div>
                            <dt className="text-sm font-medium text-muted-foreground">ID</dt>
                            <dd className="mt-1 text-sm">{vendor.id}</dd>
                        </div>
                        <div>
                            <dt className="text-sm font-medium text-muted-foreground">Username</dt>
                            <dd className="mt-1 text-sm">{vendor.username}</dd>
                        </div>
                        <div>
                            <dt className="text-sm font-medium text-muted-foreground">Email</dt>
                            <dd className="mt-1 text-sm">{vendor.email}</dd>
                        </div>
                        <div>
                            <dt className="text-sm font-medium text-muted-foreground">Type</dt>
                            <dd className="mt-1 text-sm capitalize">{vendor.type}</dd>
                        </div>
                        <div>
                            <dt className="text-sm font-medium text-muted-foreground">Created At</dt>
                            <dd className="mt-1 text-sm">{formatDate(vendor.created_at)}</dd>
                        </div>
                    </dl>
                </div>
            </div>
        </div>
    );
}

Show.layout = {
    breadcrumbs: [
        { title: 'Vendors', href: index() },
        { title: 'Vendor Details', href: '#' },
    ],
};
