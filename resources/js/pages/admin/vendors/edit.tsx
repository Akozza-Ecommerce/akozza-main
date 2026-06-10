
import VendorForm from '@/components/admin/vendors/vendor-form';
import { PageHeader } from '@/components/shared';
import { index, update } from '@/routes/admin/vendors';
import type { Vendor } from '@/types';
import { useForm } from '@inertiajs/react';

export default function Edit({ vendor }: { vendor: Vendor }) {
    const { data, setData, put, processing, errors } = useForm({
        name: vendor.name,
        email: vendor.email,
        password: '',
        password_confirmation: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        put(update(vendor));
    };

    return (
        <div className="flex flex-col gap-6 p-8">
            <PageHeader
                title="Edit Vendor"
                description={`Update details for ${vendor.name}.`}
            />

            <VendorForm
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
        { title: 'Vendors', href: index() },
        { title: 'Edit', href: '#' },
    ],
};
