import { ReactNode } from 'react';
import { FileQuestion } from 'lucide-react';

interface EmptyStateProps {
    title: string;
    description?: string;
    icon?: ReactNode;
    action?: ReactNode;
}

export function EmptyState({ 
    title, 
    description, 
    icon = <FileQuestion className="h-10 w-10 text-neutral-400" />,
    action 
}: EmptyStateProps) {
    return (
        <div className="flex flex-col items-center justify-center p-8 text-center animate-in fade-in-50">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-neutral-100 dark:bg-neutral-800">
                {icon}
            </div>
            <h3 className="mt-4 text-lg font-semibold text-neutral-900 dark:text-neutral-100">{title}</h3>
            {description && (
                <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400 max-w-sm">
                    {description}
                </p>
            )}
            {action && <div className="mt-6">{action}</div>}
        </div>
    );
}
