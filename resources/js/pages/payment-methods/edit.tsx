import { FormField, PageHeader } from '@/components/shared';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

import { edit, index, update } from '@/routes/payment-methods';
import type { PaymentMethod } from '@/types';
import { Link, useForm } from '@inertiajs/react';

export default function Edit({ paymentMethod }: { paymentMethod: PaymentMethod }) {
    const { data, setData, put, processing, errors } = useForm({
        name: paymentMethod.name,
        is_default: !!paymentMethod.is_default,
        is_active: !!paymentMethod.is_active,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        put(update(paymentMethod).url);
    };

    return (

            <div className="flex flex-col gap-6 p-8">
                <PageHeader title="Edit Payment Method" description={`Update details for ${paymentMethod.name}.`} />

                <form onSubmit={submit} className="space-y-6">
                    <FormField id="name" label="Name" error={errors.name}>
                        <Input
                            id="name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
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
                            {processing ? 'Saving...' : 'Update Payment Method'}
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
        { title: 'Payment Methods', href: index() },
        { title: 'Edit', href: '#' }
    ],
};
