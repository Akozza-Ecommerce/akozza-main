import { Customer } from './customer';
import { User } from './auth';

export interface Prescription {
    id: number;
    user_id: number;
    customer_id: number;
    name: string;
    right_sph: string | null;
    right_cyl: string | null;
    right_distance_va: string | null;
    right_axis: string | null;
    right_add: string | null;
    right_near_va: string | null;
    left_sph: string | null;
    left_cyl: string | null;
    left_distance_va: string | null;
    left_axis: string | null;
    left_add: string | null;
    left_near_va: string | null;
    ipd_distance: string | null;
    ipd_near: string | null;
    receipt_source: string | null;
    ipd_source: string | null;
    created_at: string;
    updated_at: string;

    // Relations
    user?: User;
    customer?: Customer;
}
