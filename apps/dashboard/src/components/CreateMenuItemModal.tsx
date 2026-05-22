import { useState } from 'react';

import { AppButton } from './AppButton';
import { AppInput } from './AppInput';
import { AppModal } from './AppModal';

type Props = {
    visible: boolean;
    onClose: () => void;
    onCreated?: () => Promise<void> | void;
};

export function CreateMenuItemModal({
    visible,
    onClose,
    onCreated,
}: Props) {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [categoryId, setCategoryId] = useState('');

    const handleCreate = async () => {
        try {
            await fetch('http://localhost:8787/menu-items', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    categoryId: categoryId
                        ? Number(categoryId)
                        : null,
                    name,
                    price,
                    available: true,
                }),
            });

            setName('');
            setPrice('');
            setCategoryId('');

            await onCreated?.();
            onClose();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <AppModal
            visible={visible}
            title="Add Menu Item"
            onClose={onClose}
        >
            <AppInput
                label="Name"
                value={name}
                onChangeText={setName}
                placeholder="Pizza"
            />

            <AppInput
                label="Price"
                value={price}
                onChangeText={setPrice}
                placeholder="12.99"
            />

            <AppInput
                label="Category ID"
                value={categoryId}
                onChangeText={setCategoryId}
                placeholder="1"
            />

            <AppButton
                title="Create Menu Item"
                onPress={handleCreate}
            />
        </AppModal>
    );
}