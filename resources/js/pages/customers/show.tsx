import { PageHeader } from '@/components/shared';
import { Button } from '@/components/ui/button';

import { edit, index, show } from '@/routes/customers';
import type { Customer } from '@/types';
import { Link } from '@inertiajs/react';
import { formatDate } from '@/lib/utils';
import { Pencil } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function Show({ customer }: { customer: Customer }) {
    return (
        <div className="flex flex-col gap-6 p-8">
                <PageHeader title="Customer Profile" description="View customer details and history.">
                    <Button asChild>
                        <Link href={edit(customer)}>
                            <Pencil className="mr-2 h-4 w-4" /> Edit
                        </Link>
                    </Button>
                </PageHeader>

                <div className="bg-card text-card-foreground rounded-xl border shadow-sm p-6">
                    <div className="flex items-center gap-6 mb-8">
                        <Avatar className="h-20 w-20">
                            {customer.image && <AvatarImage src={customer.image} alt={customer.name} />}
                            <AvatarFallback className="text-2xl">{customer.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div>
                            <h3 className="text-2xl font-semibold">{customer.name}</h3>
                            <p className="text-muted-foreground">{customer.phone_number}</p>
                        </div>
                    </div>
                    
                    <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                        <div className="sm:col-span-1">
                            <dt className="text-sm font-medium text-muted-foreground">ID</dt>
                            <dd className="mt-1 text-sm">{customer.id}</dd>
                        </div>
                        <div className="sm:col-span-1">
                            <dt className="text-sm font-medium text-muted-foreground">Reward Points</dt>
                            <dd className="mt-1 text-sm">{customer.points || 0}</dd>
                        </div>
                        <div className="sm:col-span-1">
                            <dt className="text-sm font-medium text-muted-foreground">Joined At</dt>
                            <dd className="mt-1 text-sm">{formatDate(customer.created_at)}</dd>
                        </div>
                    </dl>
                </div>
        </div>
    );
}

Show.layout = {
    breadcrumbs: [
        { title: 'Customers', href: index() },
        { title: 'Profile', href: '#' },
    ],
};
