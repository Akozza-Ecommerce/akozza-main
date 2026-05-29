import { ReactNode } from 'react';
import { Label } from '@/components/ui/label';

interface FormFieldProps {
    id: string;
    label: string;
    error?: string;
    description?: string;
    children: ReactNode;
    className?: string;
}

export function FormField({ id, label, error, description, children, className = '' }: FormFieldProps) {
    return (
        <div className={`space-y-2 ${className}`}>
            <Label htmlFor={id} className={error ? 'text-red-500' : ''}>
                {label}
            </Label>
            {children}
            {description && !error && (
                <p className="text-sm text-neutral-500 dark:text-neutral-400">{description}</p>
            )}
            {error && <p className="text-sm font-medium text-red-500">{error}</p>}
        </div>
    );
}
