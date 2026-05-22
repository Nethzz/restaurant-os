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

                <AppButton
                    title="+ Add Menu Item"
                    onPress={() =>
                        setModalVisible(true)
                    }
                />
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
                        <Card>
                            <Text style={styles.name}>
                                {item.name}
                            </Text>

                            <Text>
                                €{item.price}
                            </Text>

                            <Text>
                                Category:{' '}
                                {item.categoryId ??
                                    'N/A'}
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
        backgroundColor: '#fff',
    },
    header: {
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 12,
    },
    name: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 4,
    },
});