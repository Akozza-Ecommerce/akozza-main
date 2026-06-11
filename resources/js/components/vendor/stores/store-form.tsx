import { FormField } from '@/components/shared';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { index } from '@/routes/vendor/stores';
import { Link } from '@inertiajs/react';

interface StoreFormProps {
    data: any;
    setData: any;
    errors: any;
    processing: any;
    submit: any;
}

export default function StoreForm({ data, setData, errors, processing, submit }: StoreFormProps) {
    return (
        <form onSubmit={submit} className="space-y-6">
            <FormField id="name" label="Store Name" error={errors.name}>
                <Input
                    id="name"
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                    required
                />
            </FormField>

            <FormField id="slug" label="Store Slug" error={errors.slug}>
                <Input
                    id="slug"
                    value={data.slug}
                    onChange={(e) => setData('slug', e.target.value)}
                    required
                />
            </FormField>

            <FormField id="description" label="Description" error={errors.description}>
                <Textarea
                    id="description"
                    value={data.description}
                    onChange={(e) => setData('description', e.target.value)}
                    rows={4}
                />
            </FormField>

            <div className="flex gap-4">
                <Button type="submit" disabled={processing}>
                    {processing ? 'Saving...' : 'Save Store'}
                </Button>
                <Button type="button" variant="outline" asChild>
                    <Link href={index()}>Cancel</Link>
                </Button>
            </div>
        </form>
    );
}
