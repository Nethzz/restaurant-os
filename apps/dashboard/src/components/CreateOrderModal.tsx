import { useState } from 'react';
import { Text } from 'react-native';
import { useQuery } from '@tanstack/react-query';

import { AppButton } from './AppButton';
import { AppInput } from './AppInput';
import { AppModal } from './AppModal';
import { AppSelect } from './AppSelect';
import { API_URL } from '../config/api';

type Props = {
    visible: boolean;
    onClose: () => void;
    onCreated?: () => Promise<void> | void;
};

export function CreateOrderModal({
    visible,
    onClose,
    onCreated,
}: Props) {
    const [customerId, setCustomerId] = useState('');
    const [status, setStatus] = useState('PENDING');
    const [total, setTotal] = useState('');

    const { data: customers = [] } = useQuery({
        queryKey: ['customers'],
        queryFn: async () => {
            const response = await fetch(
                `${API_URL}/customers`
            );
            return response.json();
        },
    });

    const selectNextCustomer = () => {
        if (!customers.length) return;

        const currentIndex = customers.findIndex(
            (customer: any) =>
                customer.id.toString() === customerId
        );

        const nextIndex =
            currentIndex === -1
                ? 0
                : (currentIndex + 1) %
                  customers.length;

        setCustomerId(
            customers[nextIndex].id.toString()
        );
    };

    const selectedCustomer =
        customers.find(
            (customer: any) =>
                customer.id.toString() === customerId
        )?.name || 'Select Customer';

    const handleCreate = async () => {
        try {
            await fetch(`${API_URL}/orders`, {
                method: 'POST',
                headers: {
                    'Content-Type':
                        'application/json',
                },
                body: JSON.stringify({
                    customerId: customerId
                        ? Number(customerId)
                        : null,
                    status,
                    total,
                }),
            });

            setCustomerId('');
            setStatus('PENDING');
            setTotal('');

            await onCreated?.();

            onClose();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <AppModal
            visible={visible}
            title="Create Order"
            onClose={onClose}
        >
            <Text
                style={{
                    marginBottom: 6,
                    fontWeight: '600',
                }}
            >
                Customer
            </Text>

            <AppSelect
                value={selectedCustomer}
                onPress={selectNextCustomer}
            />

            <Text
                style={{
                    marginBottom: 12,
                    color: '#6b7280',
                    fontSize: 13,
                }}
            >
                Tap to change customer
            </Text>

            <AppInput
                label="Status"
                value={status}
                onChangeText={setStatus}
                placeholder="PENDING"
            />

            <AppInput
                label="Total"
                value={total}
                onChangeText={setTotal}
                placeholder="19.99"
            />

            <Text
                style={{
                    marginBottom: 12,
                    color: '#6b7280',
                }}
            >
                Example total: 19.99
            </Text>

            <AppButton
                title="Create Order"
                onPress={handleCreate}
            />
        </AppModal>
    );
}