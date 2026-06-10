import VendorForm from '@/components/admin/vendors/vendor-form';
import { PageHeader } from '@/components/shared';
import { create, index, store } from '@/routes/admin/vendors';
import { useForm } from '@inertiajs/react';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(store.url());
    };

    return (
        <div className="flex flex-col gap-6 p-8">
            <PageHeader
                title="Create Vendor"
                description="Add a new vendor account for your platform."
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

Create.layout = {
    breadcrumbs: [
        { title: 'Vendors', href: index() },
        { title: 'Create', href: create() },
    ],
};
