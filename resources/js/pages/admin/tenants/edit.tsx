import TenantForm from '@/components/admin/tenants/tenant-form';
import { PageHeader } from '@/components/shared';
import { edit, index, update } from '@/routes/admin/tenants';
import type { Tenant } from '@/types';
import { useForm } from '@inertiajs/react';

export default function Edit({ tenant }: { tenant: Tenant }) {
    const { data, setData, put, processing, errors } = useForm({
        name: tenant.name,
        owner_id: tenant.owner_id,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        put(update(tenant));
    };

    return (
        <div className="flex flex-col gap-6 p-8">
            <PageHeader
                title="Edit Tenant"
                description={`Update details for ${tenant.name}.`}
            />

            <TenantForm
                data={data}
                setData={setData}
                errors={errors}
                processing={processing}
                submit={submit}
                ownerName={tenant.owner_name ?? tenant.owner_id.toString()}
            />
        </div>
    );
}

Edit.layout = {
    breadcrumbs: [
        { title: 'Tenants', href: index() },
        { title: 'Edit', href: '#' },
    ],
};
