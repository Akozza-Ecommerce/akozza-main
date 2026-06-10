import { PageHeader } from '@/components/shared';
import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';
import { index } from '@/routes/admin/tenants';
import type { Tenant } from '@/types';
import { formatDate } from '@/lib/utils';
import { Pencil } from 'lucide-react';
import { edit } from '@/routes/admin/tenants';

export default function Show({ tenant }: { tenant: Tenant }) {
    return (
        <div className="flex flex-col gap-6 p-8">
            <PageHeader
                title={tenant.name}
                description="Tenant profile details and account information."
            >
                <Button asChild>
                    <Link href={edit(tenant)}>
                        <Pencil className="mr-2 h-4 w-4" /> Edit
                    </Link>
                </Button>
            </PageHeader>

            <div className="grid gap-6 lg:grid-cols-2">
                <div className="rounded-xl border bg-card p-6 shadow-sm">
                    <h3 className="text-lg font-semibold mb-4">Tenant Information</h3>
                    <dl className="grid gap-y-4">
                        <div>
                            <dt className="text-sm font-medium text-muted-foreground">ID</dt>
                            <dd className="mt-1 text-sm">{tenant.id}</dd>
                        </div>
                        <div>
                            <dt className="text-sm font-medium text-muted-foreground">Owner ID</dt>
                            <dd className="mt-1 text-sm">{tenant.owner_id}</dd>
                        </div>
                        <div>
                            <dt className="text-sm font-medium text-muted-foreground">Name</dt>
                            <dd className="mt-1 text-sm">{tenant.name}</dd>
                        </div>
                        <div>
                            <dt className="text-sm font-medium text-muted-foreground">Created At</dt>
                            <dd className="mt-1 text-sm">{formatDate(tenant.created_at)}</dd>
                        </div>
                    </dl>
                </div>
            </div>
        </div>
    );
}

Show.layout = {
    breadcrumbs: [
        { title: 'Tenants', href: index() },
        { title: 'Tenant Details', href: '#' },
    ],
};
