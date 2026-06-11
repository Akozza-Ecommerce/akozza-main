import StoreForm from '@/components/vendor/stores/store-form';
import { PageHeader } from '@/components/shared';
import { create, index, store } from '@/routes/vendor/stores';
import { useForm } from '@inertiajs/react';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        slug: '',
        description: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(store.url());
    };

    return (
        <div className="flex flex-col gap-6 p-8">
            <PageHeader
                title="Create Store"
                description="Add a new store."
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

Create.layout = {
    breadcrumbs: [
        { title: 'Stores', href: index() },
        { title: 'Create', href: create() },
    ],
};
