import type { InertiaLinkProps } from '@inertiajs/react';
import { clsx } from 'clsx';
import type { ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function toUrl(url: NonNullable<InertiaLinkProps['href']>): string {
    return typeof url === 'string' ? url : url.url;
}

export function formatCurrency(amount: number | string | null | undefined): string {
    const val = formatPrice(amount);
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(val);
}

export function formatPrice(amount: number | string | null | undefined): number {
    if (amount === null || amount === undefined) return 0;
    const val = (typeof amount === 'string' ? parseFloat(amount) : amount);
    // return Math.floor(Number(val.toFixed(4)) * 100) / 100;

    // 1. If it's NaN (e.g., an invalid string was passed), return 0
    if (isNaN(val)) return 0;

    // 2. Turn it into a fixed string with plenty of precision (4 decimals)
    //    64.35 becomes "64.3500"
    //    64.356 becomes "64.3560"
    const fixedStr = val.toFixed(4);
    
    // 3. Slice the string right after the second decimal place to truncate it
    //    "64.3500" -> "64.35"
    //    "64.3560" -> "64.35"
    const truncatedStr = fixedStr.substring(0, fixedStr.indexOf('.') + 3);
    
    // 4. Convert it back to a clean number
    return Number(truncatedStr);
}

export function formatDate(dateString: string | null | undefined): string {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
}
