import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { FlatList, StyleSheet, Text, View } from 'react-native';

import { AppButton } from '../components/AppButton';
import { Badge } from '../components/Badge';
import { Card } from '../components/Card';
import { CreateOrderModal } from '../components/CreateOrderModal';
import { EmptyState } from '../components/EmptyState';
import { LoadingState } from '../components/LoadingState';

export function OrdersScreen() {
    const [modalVisible, setModalVisible] = useState(false);

    const {
        data,
        isLoading,
        error,
        refetch,
    } = useQuery({
        queryKey: ['orders'],
        queryFn: async () => {
            const response = await fetch(
                'http://localhost:8787/orders'
            );
            return response.json();
        },
    });

    const markCompleted = async (id: number) => {
        try {
            await fetch(
                `http://localhost:8787/orders/${id}/status`,
                {
                    method: 'PATCH',
                    headers: {
                        'Content-Type':
                            'application/json',
                    },
                    body: JSON.stringify({
                        status: 'COMPLETED',
                    }),
                }
            );

            await refetch();
        } catch (error) {
            console.error(error);
        }
    };

    if (isLoading) {
        return <LoadingState />;
    }

    if (error) {
        return (
            <View style={styles.container}>
                <Text>Error loading orders</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>
                    Orders 📦
                </Text>

                <AppButton
                    title="+ Create Order"
                    onPress={() =>
                        setModalVisible(true)
                    }
                />
            </View>

            {!data?.length ? (
                <EmptyState message="No orders found" />
            ) : (
                <FlatList
                    data={[...(data || [])]}
                    keyExtractor={(item: any) =>
                        item.id.toString()
                    }
                    renderItem={({ item }: any) => (
                        <Card>
                            <Text
                                style={
                                    styles.orderTitle
                                }
                            >
                                Order #{item.id}
                            </Text>

                            <Badge
                                label={item.status}
                            />

                            <Text
                                style={styles.total}
                            >
                                Total: €
                                {item.total}
                            </Text>

                            <Text>
                                Customer ID:{' '}
                                {item.customerId ??
                                    'N/A'}
                            </Text>

                            {item.status !==
                                'COMPLETED' && (
                                    <View
                                        style={{
                                            marginTop: 10,
                                        }}
                                    >
                                        <AppButton
                                            title="Mark Completed"
                                            onPress={() =>
                                                markCompleted(
                                                    item.id
                                                )
                                            }
                                        />
                                    </View>
                                )}
                        </Card>
                    )}
                />
            )}

            <CreateOrderModal
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
    orderTitle: {
        fontWeight: '600',
        marginBottom: 8,
    },
    total: {
        marginTop: 8,
        marginBottom: 4,
    },
});