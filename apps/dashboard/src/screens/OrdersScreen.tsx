import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
    FlatList,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import { AppButton } from '../components/AppButton';
import { Badge } from '../components/Badge';
import { Card } from '../components/Card';
import { CreateOrderModal } from '../components/CreateOrderModal';
import { EmptyState } from '../components/EmptyState';
import { LoadingState } from '../components/LoadingState';
import { OrderDetailsModal } from '../components/OrderDetailsModal';
import { API_URL } from '../../api';

export function OrdersScreen() {
    const [modalVisible, setModalVisible] =
        useState(false);

    const [detailsVisible, setDetailsVisible] =
        useState(false);

    const [selectedOrder, setSelectedOrder] =
        useState<any>(null);

    const [filter, setFilter] = useState<
        'ALL' | 'PENDING' | 'COMPLETED'
    >('ALL');

    const {
        data,
        isLoading,
        error,
        refetch,
    } = useQuery({
        queryKey: ['orders'],
        queryFn: async () => {
            const response = await fetch(
                `${API_URL}/orders`
            );

            return response.json();
        },
    });

    const totalOrders = data?.length || 0;

    const pendingOrders =
        data?.filter(
            (order: any) =>
                order.status === 'PENDING'
        ).length || 0;

    const completedOrders =
        data?.filter(
            (order: any) =>
                order.status === 'COMPLETED'
        ).length || 0;

    const filteredOrders =
        filter === 'ALL'
            ? data || []
            : (data || []).filter(
                (order: any) =>
                    order.status === filter
            );

    const markCompleted = async (id: number) => {
        try {
            await fetch(
                `${API_URL}/orders/${id}/status`,
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
            <View style={styles.center}>
                <Text>
                    Error loading orders
                </Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                ListHeaderComponent={
                    <>
                        <View
                            style={
                                styles.header
                            }
                        >
                            <Text
                                style={
                                    styles.title
                                }
                            >
                                Orders 📦
                            </Text>

                            <AppButton
                                title="+ Create Order"
                                onPress={() =>
                                    setModalVisible(
                                        true
                                    )
                                }
                            />
                        </View>

                        <View
                            style={
                                styles.statsRow
                            }
                        >
                            <Card>
                                <Text
                                    style={
                                        styles.statLabel
                                    }
                                >
                                    Total
                                </Text>

                                <Text
                                    style={
                                        styles.statValue
                                    }
                                >
                                    {
                                        totalOrders
                                    }
                                </Text>
                            </Card>

                            <Card>
                                <Text
                                    style={
                                        styles.statLabel
                                    }
                                >
                                    Pending
                                </Text>

                                <Text
                                    style={
                                        styles.statValue
                                    }
                                >
                                    {
                                        pendingOrders
                                    }
                                </Text>
                            </Card>

                            <Card>
                                <Text
                                    style={
                                        styles.statLabel
                                    }
                                >
                                    Completed
                                </Text>

                                <Text
                                    style={
                                        styles.statValue
                                    }
                                >
                                    {
                                        completedOrders
                                    }
                                </Text>
                            </Card>
                        </View>

                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={
                                false
                            }
                            style={
                                styles.filterContainer
                            }
                        >
                            <AppButton
                                title="All"
                                onPress={() =>
                                    setFilter(
                                        'ALL'
                                    )
                                }
                            />

                            <View
                                style={{
                                    width: 10,
                                }}
                            />

                            <AppButton
                                title="Pending"
                                onPress={() =>
                                    setFilter(
                                        'PENDING'
                                    )
                                }
                            />

                            <View
                                style={{
                                    width: 10,
                                }}
                            />

                            <AppButton
                                title="Completed"
                                onPress={() =>
                                    setFilter(
                                        'COMPLETED'
                                    )
                                }
                            />
                        </ScrollView>
                    </>
                }
                data={filteredOrders}
                keyExtractor={(
                    item: any
                ) => item.id.toString()}
                contentContainerStyle={{
                    paddingBottom: 40,
                }}
                ListEmptyComponent={
                    <EmptyState message="No orders found" />
                }
                renderItem={({ item }: any) => (
                    <Pressable
                        onPress={() => {
                            setSelectedOrder(
                                item
                            );
                            setDetailsVisible(
                                true
                            );
                        }}
                    >
                        <Card>
                            <View
                                style={
                                    styles.orderHeader
                                }
                            >
                                <Text
                                    style={
                                        styles.orderTitle
                                    }
                                >
                                    Order #
                                    {item.id}
                                </Text>

                                <Badge
                                    label={
                                        item.status
                                    }
                                />
                            </View>

                            <Text
                                style={
                                    styles.customer
                                }
                            >
                                Customer ID:{' '}
                                {item.customerId ??
                                    'N/A'}
                            </Text>

                            <Text
                                style={
                                    styles.price
                                }
                            >
                                €
                                {item.total}
                            </Text>

                            {item.createdAt && (
                                <Text
                                    style={
                                        styles.date
                                    }
                                >
                                    {new Date(
                                        item.createdAt
                                    ).toLocaleString()}
                                </Text>
                            )}

                            {item.status !==
                                'COMPLETED' && (
                                    <View
                                        style={
                                            styles.actionContainer
                                        }
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
                    </Pressable>
                )}
            />

            <CreateOrderModal
                visible={modalVisible}
                onClose={() =>
                    setModalVisible(false)
                }
                onCreated={async () => {
                    await refetch();
                }}
            />

            <OrderDetailsModal
                visible={detailsVisible}
                order={selectedOrder}
                onClose={() =>
                    setDetailsVisible(false)
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8fafc',
        paddingHorizontal: 16,
        paddingTop: 16,
    },

    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    header: {
        marginBottom: 20,
    },

    title: {
        fontSize: 28,
        fontWeight: '700',
        marginBottom: 12,
    },

    statsRow: {
        flexDirection: 'row',
        gap: 12,
        marginBottom: 20,
    },

    statLabel: {
        fontSize: 12,
        color: '#64748b',
    },

    statValue: {
        fontSize: 22,
        fontWeight: '700',
        marginTop: 6,
    },

    filterContainer: {
        marginBottom: 20,
    },

    orderHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },

    orderTitle: {
        fontSize: 16,
        fontWeight: '700',
    },

    customer: {
        color: '#64748b',
        marginBottom: 8,
    },

    price: {
        fontSize: 22,
        fontWeight: '700',
    },

    date: {
        marginTop: 6,
        color: '#94a3b8',
        fontSize: 12,
    },

    actionContainer: {
        marginTop: 14,
    },
});