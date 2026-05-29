import { FormField, PageHeader } from '@/components/shared';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { create, index, store } from '@/routes/prescriptions';
import type { Customer } from '@/types';
import { Link, useForm } from '@inertiajs/react';

export default function Create({ customers }: { customers: Customer[] }) {
    const { data, setData, post, processing, errors } = useForm({
        customer_id: '',
        name: '',
        right_sph: '',
        right_cyl: '',
        right_distance_va: '',
        right_axis: '',
        right_add: '',
        right_near_va: '',
        left_sph: '',
        left_cyl: '',
        left_distance_va: '',
        left_axis: '',
        left_add: '',
        left_near_va: '',
        ipd_distance: '',
        ipd_near: '',
        receipt_source: '',
        ipd_source: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(store.url());
    };

    const inputFields = [
        { id: 'right_sph', label: 'R. SPH' },
        { id: 'right_cyl', label: 'R. CYL' },
        { id: 'right_axis', label: 'R. Axis' },
        { id: 'right_add', label: 'R. Add' },
        { id: 'right_distance_va', label: 'R. Dist VA' },
        { id: 'right_near_va', label: 'R. Near VA' },
        { id: 'left_sph', label: 'L. SPH' },
        { id: 'left_cyl', label: 'L. CYL' },
        { id: 'left_axis', label: 'L. Axis' },
        { id: 'left_add', label: 'L. Add' },
        { id: 'left_distance_va', label: 'L. Dist VA' },
        { id: 'left_near_va', label: 'L. Near VA' },
        { id: 'ipd_distance', label: 'IPD Distance' },
        { id: 'ipd_near', label: 'IPD Near' },
        { id: 'receipt_source', label: 'Receipt Source' },
        { id: 'ipd_source', label: 'IPD Source' },
    ];

    return (

            <div className="flex flex-col gap-6 p-8">
                <PageHeader title="Create Prescription" description="Add a new patient prescription." />

                <form onSubmit={submit} className="space-y-8">
                    <div className="bg-card border shadow-sm rounded-xl p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField id="customer_id" label="Customer" error={errors.customer_id}>
                                <select
                                    id="customer_id"
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                    value={data.customer_id}
                                    onChange={(e) => setData('customer_id', e.target.value)}
                                    required
                                >
                                    <option value="">Select a customer...</option>
                                    {customers.map((c) => (
                                        <option key={c.id} value={c.id}>{c.name}</option>
                                    ))}
                                </select>
                            </FormField>

                            <FormField id="name" label="Prescription Name" error={errors.name}>
                                <Input
                                    id="name"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    placeholder="e.g. Reading Glasses"
                                    required
                                />
                            </FormField>
                        </div>
                    </div>

                    <div className="bg-card border shadow-sm rounded-xl p-6">
                        <h3 className="text-lg font-semibold mb-6 border-b pb-2">Ophthalmic Details</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                            {inputFields.map((field) => (
                                <FormField key={field.id} id={field.id} label={field.label} error={errors[field.id as keyof typeof errors]}>
                                    <Input
                                        id={field.id}
                                        value={data[field.id as keyof typeof data] || ''}
                                        onChange={(e) => setData(field.id as any, e.target.value)}
                                    />
                                </FormField>
                            ))}
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <Button type="submit" disabled={processing}>
                            {processing ? 'Saving...' : 'Save Prescription'}
                        </Button>
                        <Button type="button" variant="outline" asChild>
                            <Link href={index()}>Cancel</Link>
                        </Button>
                    </div>
                </form>
            </div>
    );
}

Create.layout = {
    breadcrumbs: [
        { title: 'Prescriptions', href: index() },
        { title: 'Create', href: create() }
    ],
};
