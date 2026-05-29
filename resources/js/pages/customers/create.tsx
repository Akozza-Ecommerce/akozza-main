import { FormField, PageHeader } from '@/components/shared';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { create, index, store } from '@/routes/customers';
import { Link, useForm } from '@inertiajs/react';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        phone_number: '',
        points: 0,
        image: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(store.url());
    };

    return (
        <div className="flex flex-col gap-6 p-8">
                <PageHeader
                    title="Create Customer"
                    description="Add a new customer to your database."
                />

                <form onSubmit={submit} className="space-y-6">
                    <FormField id="name" label="Full Name" error={errors.name}>
                        <Input
                            id="name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            placeholder="John Doe"
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
                            placeholder="+1 234 567 890"
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
                            {processing ? 'Saving...' : 'Save Customer'}
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
        { title: 'Customers', href: index() },
        { title: 'Create', href: create() },
    ],
};
