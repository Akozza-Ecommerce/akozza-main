import { PageHeader } from '@/components/shared';
import { Button } from '@/components/ui/button';

import { edit, index, show } from '@/routes/prescriptions';
import type { Prescription } from '@/types';
import { Link } from '@inertiajs/react';
import { Pencil, Printer } from 'lucide-react';
import { formatDate } from '@/lib/utils';

export default function Show({ prescription }: { prescription: Prescription }) {
    const detailRows = [
        { label: 'R. SPH', value: prescription.right_sph },
        { label: 'R. CYL', value: prescription.right_cyl },
        { label: 'R. Axis', value: prescription.right_axis },
        { label: 'R. Add', value: prescription.right_add },
        { label: 'R. Dist VA', value: prescription.right_distance_va },
        { label: 'R. Near VA', value: prescription.right_near_va },
        { label: 'L. SPH', value: prescription.left_sph },
        { label: 'L. CYL', value: prescription.left_cyl },
        { label: 'L. Axis', value: prescription.left_axis },
        { label: 'L. Add', value: prescription.left_add },
        { label: 'L. Dist VA', value: prescription.left_distance_va },
        { label: 'L. Near VA', value: prescription.left_near_va },
        { label: 'IPD Distance', value: prescription.ipd_distance },
        { label: 'IPD Near', value: prescription.ipd_near },
        { label: 'Receipt Source', value: prescription.receipt_source },
        { label: 'IPD Source', value: prescription.ipd_source },
    ];

    return (

            <div className="flex flex-col gap-6 p-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <PageHeader 
                        title={`Prescription #PR-${prescription.id.toString().padStart(4, '0')}`} 
                        description="View patient prescription details." 
                    />
                    
                    <div className="flex gap-2">
                        <Button variant="outline" asChild>
                            <Link href={edit(prescription)}>
                                <Pencil className="mr-2 h-4 w-4" /> Edit
                            </Link>
                        </Button>
                        <Button variant="outline" onClick={() => window.print()}>
                            <Printer className="mr-2 h-4 w-4" /> Print
                        </Button>
                    </div>
                </div>

                <div className="bg-card text-card-foreground rounded-xl border shadow-sm p-8" id="prescription-printable">
                    <div className="flex justify-between items-start mb-12 border-b pb-8">
                        <div>
                            <h2 className="text-3xl font-bold tracking-tight mb-2 uppercase">Prescription</h2>
                            <p className="text-muted-foreground">Generated on {formatDate(prescription.created_at)}</p>
                        </div>
                        <div className="text-right">
                            <p className="font-semibold text-lg">My Company Ltd.</p>
                            <p className="text-muted-foreground text-sm">contact@example.com</p>
                        </div>
                    </div>

                    <div className="mb-12">
                        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2">Patient Information</h3>
                        <p className="font-semibold text-xl">{prescription.customer?.name}</p>
                        <p className="text-muted-foreground">{prescription.customer?.phone_number}</p>
                        <p className="mt-4 font-medium text-lg">Type: {prescription.name}</p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-12">
                        {detailRows.map((row, index) => (
                            <div key={index} className="border-b border-muted pb-2">
                                <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">{row.label}</h3>
                                <p className="font-medium text-lg">{row.value || '-'}</p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-16 text-center text-sm text-muted-foreground border-t pt-8">
                        <p>This prescription is valid for 2 years from the date of issue.</p>
                    </div>
                </div>
            </div>
    );
}

Show.layout = {
    breadcrumbs: [
        { title: 'Prescriptions', href: index() },
        { title: 'Details', href: '#' }
    ],
};
