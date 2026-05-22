import { useState } from 'react';
import { Text } from 'react-native';

import { postOrders } from '@repo/api-client';

import { AppButton } from './AppButton';
import { AppInput } from './AppInput';
import { AppModal } from './AppModal';

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

    const handleCreate = async () => {
        try {
            await fetch('http://localhost:8787/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
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
            <AppInput
                label="Customer ID"
                value={customerId}
                onChangeText={setCustomerId}
                placeholder="1"
            />

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

            <Text style={{ marginBottom: 12 }}>
                Example: customer=1, total=19.99
            </Text>

            <AppButton
                title="Create Order"
                onPress={handleCreate}
            />
        </AppModal>
    );
}