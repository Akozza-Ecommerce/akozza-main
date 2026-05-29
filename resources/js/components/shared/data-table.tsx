import { ReactNode } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { EmptyState } from './empty-state';

interface Column<T> {
    header: string;
    accessorKey?: keyof T;
    cell?: (item: T) => ReactNode;
    className?: string;
}

interface DataTableProps<T> {
    data: T[];
    columns: Column<T>[];
    emptyState?: ReactNode;
}

export function DataTable<T>({ data, columns, emptyState }: DataTableProps<T>) {
    return (
        <div className="rounded-md border border-neutral-200 dark:border-neutral-800">
            <Table>
                <TableHeader>
                    <TableRow>
                        {columns.map((column, i) => (
                            <TableHead key={i} className={column.className}>
                                {column.header}
                            </TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={columns.length} className="h-24 text-center">
                                {emptyState || <EmptyState title="No results" description="No data found." />}
                            </TableCell>
                        </TableRow>
                    ) : (
                        data.map((item, i) => (
                            <TableRow key={i}>
                                {columns.map((column, j) => (
                                    <TableCell key={j} className={column.className}>
                                        {column.cell ? column.cell(item) : (item[column.accessorKey as keyof T] as ReactNode)}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
