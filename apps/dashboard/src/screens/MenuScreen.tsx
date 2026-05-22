import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { FlatList, StyleSheet, Text, View } from 'react-native';

import { AppButton } from '../components/AppButton';
import { Card } from '../components/Card';
import { CreateMenuItemModal } from '../components/CreateMenuItemModal';
import { EmptyState } from '../components/EmptyState';
import { LoadingState } from '../components/LoadingState';
import { API_URL } from '../../api';

export function MenuScreen() {
    const [modalVisible, setModalVisible] = useState(false);

    const {
        data,
        isLoading,
        error,
        refetch,
    } = useQuery({
        queryKey: ['menu-items'],
        queryFn: async () => {
            const response = await fetch(
                `${API_URL}/menu-items`
            );
            return response.json();
        },
    });

    if (isLoading) {
        return <LoadingState />;
    }

    if (error) {
        return (
            <View style={styles.container}>
                <Text>Error loading menu items</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
           <View style={styles.header}>
    <Text style={styles.title}>
        Restaurant Menu 🍕
    </Text>

    <Text style={styles.subtitle}>
        Manage menu items and pricing
    </Text>

    <View style={{ marginTop: 12 }}>
        <AppButton
            title="+ Add Menu Item"
            onPress={() =>
                setModalVisible(true)
            }
        />
    </View>
</View>

            {!data?.length ? (
                <EmptyState message="No menu items found" />
            ) : (
                <FlatList
                    data={[...(data || [])]}
                    keyExtractor={(item: any) =>
                        item.id.toString()
                    }
                    renderItem={({ item }: any) => (
                     <Card style={styles.card}>
    <View style={styles.row}>
        <Text style={styles.name}>
            🍽️ {item.name}
        </Text>

        <Text style={styles.price}>
            €{item.price}
        </Text>
    </View>

    <Text style={styles.category}>
        Category ID: {item.categoryId ?? 'N/A'}
    </Text>
</Card>
                    )}
                />
            )}

            <CreateMenuItemModal
                visible={modalVisible}
                onClose={() =>
                    setModalVisible(false)
                }
                onCreated={async () => {
                    await refetch();
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#F3F4F6',
    },

    header: {
        marginBottom: 20,
    },

    title: {
        fontSize: 30,
        fontWeight: '800',
        color: '#111827',
        marginBottom: 6,
    },

    subtitle: {
        fontSize: 15,
        color: '#6B7280',
    },

    card: {
        marginBottom: 14,
    },

    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    name: {
        fontSize: 18,
        fontWeight: '700',
        color: '#111827',
        flex: 1,
    },

    price: {
        fontSize: 18,
        fontWeight: '700',
        color: '#16A34A',
    },

    category: {
        marginTop: 10,
        fontSize: 14,
        color: '#6B7280',
    },
});