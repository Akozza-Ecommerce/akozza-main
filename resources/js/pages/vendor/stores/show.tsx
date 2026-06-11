import { PageHeader } from '@/components/shared';
import type { Store } from '@/types';
import { index, show } from '@/routes/vendor/stores';

export default function Show({ store }: { store: Store }) {
    return (
        <div className="flex flex-col gap-6 p-8">
            <PageHeader
                title={store.name}
                description="Store details and information."
            />

            <div className="rounded-lg border p-6 space-y-4 max-w-2xl">
                <div>
                    <dt className="text-sm font-medium">ID</dt>
                    <dd className="mt-1 text-sm">{store.id}</dd>
                </div>
                <div>
                    <dt className="text-sm font-medium">Name</dt>
                    <dd className="mt-1 text-sm">{store.name}</dd>
                </div>
                <div>
                    <dt className="text-sm font-medium">Slug</dt>
                    <dd className="mt-1 text-sm">{store.slug}</dd>
                </div>
                <div>
                    <dt className="text-sm font-medium">Description</dt>
                    <dd className="mt-1 text-sm text-muted-foreground">{store.description || 'No description provided.'}</dd>
                </div>
                <div>
                    <dt className="text-sm font-medium">Created</dt>
                    <dd className="mt-1 text-sm">{new Date(store.created_at).toLocaleDateString()}</dd>
                </div>
            </div>
        </div>
    );
}

Show.layout = {
    breadcrumbs: [
        {
            title: 'Stores',
            href: index(),
        },
        {
            title: 'Details',
            href: '#',
        },
    ],
};
