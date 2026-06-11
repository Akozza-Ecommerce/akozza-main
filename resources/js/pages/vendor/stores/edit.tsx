import StoreForm from '@/components/vendor/stores/store-form';
import { PageHeader } from '@/components/shared';
import { index, update } from '@/routes/vendor/stores';
import type { Store } from '@/types';
import { useForm } from '@inertiajs/react';

export default function Edit({ store }: { store: Store }) {
    const { data, setData, put, processing, errors } = useForm({
        name: store.name,
        slug: store.slug,
        description: store.description ?? '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        put(update(store));
    };

    return (
        <div className="flex flex-col gap-6 p-8">
            <PageHeader
                title="Edit Store"
                description={`Update details for ${store.name}.`}
            />

            <StoreForm
                data={data}
                setData={setData}
                errors={errors}
                processing={processing}
                submit={submit}
            />
        </div>
    );
}

Edit.layout = {
    breadcrumbs: [
        { title: 'Stores', href: index() },
        { title: 'Edit', href: '#' },
    ],
};
