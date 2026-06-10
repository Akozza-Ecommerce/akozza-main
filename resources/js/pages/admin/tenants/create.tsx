import TenantForm from '@/components/admin/tenants/tenant-form';
import { PageHeader } from '@/components/shared';
import { create, index, store } from '@/routes/admin/tenants';
import { useForm } from '@inertiajs/react';

export default function Create({ owners }: { owners: { id: number; name: string }[] }) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        owner_id: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(store.url());
    };

    return (
        <div className="flex flex-col gap-6 p-8">
            <PageHeader
                title="Create Tenant"
                description="Add a new tenant for your platform."
            />

            <TenantForm
                data={data}
                setData={setData}
                errors={errors}
                processing={processing}
                submit={submit}
                owners={owners}
            />
        </div>
    );
}

Create.layout = {
    breadcrumbs: [
        { title: 'Tenants', href: index() },
        { title: 'Create', href: create() },
    ],
};
