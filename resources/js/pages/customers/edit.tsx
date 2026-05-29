import { FormField, PageHeader } from '@/components/shared';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { edit, index, update } from '@/routes/customers';
import type { Customer } from '@/types';
import { Link, useForm } from '@inertiajs/react';

export default function Edit({ customer }: { customer: Customer }) {
    const { data, setData, put, processing, errors } = useForm({
        name: customer.name,
        phone_number: customer.phone_number,
        points: customer.points || 0,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        put(update(customer));
    };

    return (
        <div className="flex flex-col gap-6 p-8">
                <PageHeader
                    title="Edit Customer"
                    description={`Update details for ${customer.name}.`}
                />

                <form onSubmit={submit} className="space-y-6">
                    <FormField id="name" label="Full Name" error={errors.name}>
                        <Input
                            id="name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            required
                        />
                    </FormField>

                    <FormField
                        id="phone_number"
                        label="Phone Number"
                        error={errors.phone_number}
                    >
                        <Input
                            id="phone_number"
                            value={data.phone_number}
                            onChange={(e) =>
                                setData('phone_number', e.target.value)
                            }
                            required
                        />
                    </FormField>

                    <FormField id="points" label="Points" error={errors.points}>
                        <Input
                            id="points"
                            type="number"
                            value={data.points}
                            onChange={(e) =>
                                setData('points', parseInt(e.target.value))
                            }
                        />
                    </FormField>

                    <div className="flex gap-4">
                        <Button type="submit" disabled={processing}>
                            {processing ? 'Saving...' : 'Update Customer'}
                        </Button>
                        <Button type="button" variant="outline" asChild>
                            <Link href={index()}>Cancel</Link>
                        </Button>
                    </div>
                </form>
        </div>
    );
}

Edit.layout = {
    breadcrumbs: [
        { title: 'Customers', href: index() },
        { title: 'Edit', href: '#' },
    ],
};
