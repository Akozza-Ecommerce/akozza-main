export type * from './auth';
export type * from './navigation';
export type * from './ui';
export type * from './customer';
export type * from './payment-method';
export type * from './product';
export type * from './coupon';
export type * from './invoice';
export type * from './prescription';
export type * from './category';
export type * from './order';
export type * from './tenant';
export type * from './vendor';

export interface MetaPagination {
    current_page: number;
    last_page: number;
    from: number;
    per_page: number;
    to: number;
    total: number;
    path: string;
    links: {
        active: boolean;
        label: string;
        url?: string;
        page?: string;
    }[];
}

export interface LinksPagination {
    first: string;
    last: string;
    next?: string;
    prev?: string;
}

export type PaginatedData<T> = {
    data: T[];
    meta: MetaPagination;
    links: LinksPagination;
}

export type PaginatedType<T> = PaginatedData<T>;