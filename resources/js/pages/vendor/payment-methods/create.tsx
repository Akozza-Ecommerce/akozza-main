import { FormField, PageHeader } from '@/components/shared';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

import { create, index, store } from '@/routes/payment-methods';
import { Link, useForm } from '@inertiajs/react';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        is_default: false,
        is_active: true,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(store.url());
    };

    return (
        <div className="flex flex-col gap-6 p-8">
                <PageHeader title="Create Payment Method" description="Add a new payment method." />

                <form onSubmit={submit} className="space-y-6">
                    <FormField id="name" label="Name" error={errors.name}>
                        <Input
                            id="name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            placeholder="e.g. Cash, Credit Card, Bank Transfer"
                            required
                        />
                    </FormField>

                    <div className="flex items-center space-x-2">
                        <Switch
                            id="is_default"
                            checked={data.is_default}
                            onCheckedChange={(checked) => setData('is_default', checked)}
                        />
                        <Label htmlFor="is_default">Set as default payment method</Label>
                    </div>
                    {errors.is_default && <p className="text-sm font-medium text-red-500">{errors.is_default}</p>}

                    <div className="flex items-center space-x-2">
                        <Switch
                            id="is_active"
                            checked={data.is_active}
                            onCheckedChange={(checked) => setData('is_active', checked)}
                        />
                        <Label htmlFor="is_active">Active</Label>
                    </div>
                    {errors.is_active && <p className="text-sm font-medium text-red-500">{errors.is_active}</p>}

                    <div className="flex gap-4">
                        <Button type="submit" disabled={processing}>
                            {processing ? 'Saving...' : 'Save Payment Method'}
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
        { title: 'Payment Methods', href: index() },
        { title: 'Create', href: create() },
    ],
};
