import { useQuery } from '@tanstack/react-query';
import {
    FlatList,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import { Card } from '../components/Card';
import { EmptyState } from '../components/EmptyState';
import { LoadingState } from '../components/LoadingState';

export function CustomersScreen() {
    const {
        data: customers = [],
        isLoading,
        error,
    } = useQuery({
        queryKey: ['customers'],
        queryFn: async () => {
            const response = await fetch(
                'http://localhost:8787/customers'
            );

            return response.json();
        },
    });

    const { data: orders = [] } = useQuery({
        queryKey: ['orders'],
        queryFn: async () => {
            const response = await fetch(
                'http://localhost:8787/orders'
            );

            return response.json();
        },
    });

    if (isLoading) {
        return <LoadingState />;
    }

    if (error) {
        return (
            <View style={styles.center}>
                <Text>
                    Error loading customers
                </Text>
            </View>
        );
    }

    if (!customers.length) {
        return (
            <EmptyState message="No customers found" />
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                CRM 👥
            </Text>

            <FlatList
                data={customers}
                keyExtractor={(item: any) =>
                    item.id.toString()
                }
                contentContainerStyle={{
                    paddingBottom: 30,
                }}
                renderItem={({ item }: any) => {
                    const customerOrders =
                        orders.filter(
                            (order: any) =>
                                order.customerId ===
                                item.id
                        );

                    const orderCount =
                        customerOrders.length;

                    const totalSpend =
                        customerOrders.reduce(
                            (
                                sum: number,
                                order: any
                            ) =>
                                sum +
                                Number(
                                    order.total
                                ),
                            0
                        );

                    const latestOrder =
                        customerOrders[
                        customerOrders.length -
                        1
                        ];

                    return (
                        <Card>
                            <Text
                                style={
                                    styles.name
                                }
                            >
                                {item.name}
                            </Text>

                            <Text
                                style={
                                    styles.email
                                }
                            >
                                {item.email ??
                                    'No email'}
                            </Text>

                            <View
                                style={
                                    styles.statsRow
                                }
                            >
                                <View>
                                    <Text
                                        style={
                                            styles.label
                                        }
                                    >
                                        Orders
                                    </Text>

                                    <Text
                                        style={
                                            styles.value
                                        }
                                    >
                                        {
                                            orderCount
                                        }
                                    </Text>
                                </View>

                                <View>
                                    <Text
                                        style={
                                            styles.label
                                        }
                                    >
                                        Spend
                                    </Text>

                                    <Text
                                        style={
                                            styles.value
                                        }
                                    >
                                        €
                                        {totalSpend.toFixed(
                                            2
                                        )}
                                    </Text>
                                </View>
                            </View>

                            {latestOrder && (
                                <Text
                                    style={
                                        styles.recent
                                    }
                                >
                                    Recent Order #
                                    {
                                        latestOrder.id
                                    }
                                </Text>
                            )}
                        </Card>
                    );
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f8fafc',
    },

    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    title: {
        fontSize: 28,
        fontWeight: '700',
        marginBottom: 20,
    },

    name: {
        fontSize: 18,
        fontWeight: '700',
        marginBottom: 4,
    },

    email: {
        color: '#64748b',
        marginBottom: 14,
    },

    statsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },

    label: {
        color: '#64748b',
        fontSize: 12,
    },

    value: {
        fontSize: 18,
        fontWeight: '700',
    },

    recent: {
        color: '#2563eb',
        fontWeight: '600',
    },
});