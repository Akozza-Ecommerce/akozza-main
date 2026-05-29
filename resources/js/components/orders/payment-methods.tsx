import React from 'react';
import { FormField } from '../shared';
import { Input } from '../ui/input';
import type { PaymentMethod } from '@/types';
import { formatCurrency, formatPrice } from '@/lib/utils';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '../ui/select';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';

interface PaymentMethodsProps {
    data: any;
    setData: any;
    errors: any;
    paymentMethods: PaymentMethod[];
}

export default function PaymentMethods({
    data,
    setData,
    errors,
    paymentMethods,
}: PaymentMethodsProps) {
    const addPaymentMethod = () => {
        setData('payments', [
            ...data.payments,
            {
                payment_method_id: '',
                amount:
                    data.payments?.length > 0
                        ? 0
                        : formatPrice(data.total_amount),
            },
        ]);
    };

    const removePaymentMethod = (index: number) => {
        setData(
            'payments',
            data.payments?.filter((_: any, i: number) => i !== index),
        );
    };

    const handlePaymentMethodChange = (
        index: number,
        payment_method_id: string,
    ) => {
        setData(
            'payments',
            data.payments?.map((p: any, i: number) =>
                i === index ? { ...p, payment_method_id } : p,
            ),
        );
    };

    const handleAmountChange = (index: number, amount: string) => {
        setData(
            'payments',
            data.payments?.map((p: any, i: number) =>
                i === index ? { ...p, amount: formatPrice(amount) } : p,
            ),
        );
    };

    return (
        <div>
            {data.payments.length > 0 ? data.payments.map((payment: any, index: number) => (
                <div
                    className="flex gap-4 max-sm:flex-col sm:mb-8 md:mb-2"
                    key={index}
                >
                    <div className="grid w-full grid-cols-1 gap-8 sm:gap-0 md:grid-cols-2 md:gap-6">
                        <FormField
                            id="payment_method_ids"
                            label="Payment Method"
                            // error={errors.payment_method_id}
                        >
                            <Select
                                onValueChange={(value: string) =>
                                    handlePaymentMethodChange(index, value)
                                }
                                defaultValue={payment.payment_method_id?.toString()}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select a payment method..." />
                                </SelectTrigger>

                                <SelectContent>
                                    {paymentMethods.map((pm) => (
                                        <SelectItem
                                            key={pm.id}
                                            value={pm.id?.toString()}
                                        >
                                            {pm.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </FormField>

                        <FormField
                            id="amount"
                            label="Amount"
                            // error={errors.total_amount}
                        >
                            <Input
                                type="number"
                                id="amount[${index}]"
                                value={formatPrice(payment.amount)}
                                onChange={(e) =>
                                    handleAmountChange(index, e.target.value)
                                }
                                step={0.01}
                                max={formatPrice(data.total_amount)}
                                required
                            />
                        </FormField>
                    </div>

                    <Button
                        variant="destructive"
                        className="mt-6"
                        onClick={() => removePaymentMethod(index)}
                        type="button"
                    >
                        Remove
                    </Button>
                </div>
            )) : (
                <div className="rounded-lg border border-dashed bg-muted/30 py-8 text-center text-muted-foreground">
                        No Payments added yet. Click "Add" to start.
                    </div>
            )}

            <Separator className="mt-10 mb-6" />

            <Button onClick={addPaymentMethod} type="button">
                Add
            </Button>
        </div>
    );
}
