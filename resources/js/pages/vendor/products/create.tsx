import { FormField, PageHeader } from '@/components/shared';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

import { create, index, store } from '@/routes/products';
import { Link, useForm } from '@inertiajs/react';
import { Category } from '@/types';

export default function Create({ categories }: { categories: Category[] }) {
    const { data, setData, post, processing, errors } = useForm({
        barcode: '',
        name: '',
        category_id: '' as unknown as number,
        cost: '',
        price: '',
        qty: 0,
        is_active: true,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(store.url());
    };

    return (
        <div className="flex flex-col gap-6 p-8">
            <PageHeader
                title="Create Product"
                description="Add a new product to your inventory."
            />

            <form onSubmit={submit} className="space-y-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <FormField
                        id="barcode"
                        label="Barcode"
                        error={errors.barcode}
                    >
                        <Input
                            id="barcode"
                            value={data.barcode}
                            onChange={(e) => setData('barcode', e.target.value)}
                            placeholder="Scan or enter barcode"
                            required
                        />
                    </FormField>

                    <FormField
                        id="category_id"
                        label="Category"
                        error={errors.category_id}
                    >
                        <Select
                            value={
                                data.category_id
                                    ? data.category_id.toString()
                                    : ''
                            }
                            onValueChange={(value) =>
                                setData('category_id', parseInt(value))
                            }
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                            <SelectContent>
                                {categories.map((category) => (
                                    <SelectItem
                                        key={category.id}
                                        value={category.id.toString()}
                                    >
                                        {category.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </FormField>
                </div>

                <FormField id="name" label="Product Name" error={errors.name}>
                    <Input
                        id="name"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        placeholder="e.g. Wireless Headphones"
                        required
                    />
                </FormField>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    <FormField id="cost" label="Cost" error={errors.cost}>
                        <Input
                            id="cost"
                            type="number"
                            step="0.01"
                            min="0"
                            value={data.cost}
                            onChange={(e) => setData('cost', e.target.value)}
                            required
                        />
                    </FormField>

                    <FormField
                        id="price"
                        label="Selling Price"
                        error={errors.price}
                    >
                        <Input
                            id="price"
                            type="number"
                            step="0.01"
                            min="0"
                            value={data.price}
                            onChange={(e) => setData('price', e.target.value)}
                            required
                        />
                    </FormField>

                    <FormField
                        id="qty"
                        label="Stock Quantity"
                        error={errors.qty}
                    >
                        <Input
                            id="qty"
                            type="number"
                            min="0"
                            value={data.qty}
                            onChange={(e) =>
                                setData('qty', parseInt(e.target.value))
                            }
                            required
                        />
                    </FormField>
                </div>

                <div className="flex items-center space-x-2">
                    <Switch
                        id="is_active"
                        checked={data.is_active}
                        onCheckedChange={(checked) =>
                            setData('is_active', checked)
                        }
                    />
                    <Label htmlFor="is_active">
                        Active (Available for sale)
                    </Label>
                </div>
                {errors.is_active && (
                    <p className="text-sm font-medium text-red-500">
                        {errors.is_active}
                    </p>
                )}

                <div className="flex gap-4 border-t border-neutral-200 pt-4 dark:border-neutral-800">
                    <Button type="submit" disabled={processing}>
                        {processing ? 'Saving...' : 'Save Product'}
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
        { title: 'Products', href: index() },
        { title: 'Create', href: create() },
    ],
};
