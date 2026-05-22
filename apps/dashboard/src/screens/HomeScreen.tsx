import { useQuery } from '@tanstack/react-query';
import {
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import { Card } from '../components/Card';
import { API_URL } from '../config/api';

export function HomeScreen() {
    const { data: orders = [] } = useQuery({
        queryKey: ['orders'],
        queryFn: async () => {
            const response = await fetch(`${API_URL}/orders`);
            return response.json();
        },
    });

    const { data: customers = [] } = useQuery({
        queryKey: ['customers'],
        queryFn: async () => {
            const response = await fetch(
                `${API_URL}/customers`
            );
            return response.json();
        },
    });

    const totalRevenue = orders.reduce(
        (sum: number, order: any) =>
            sum + Number(order.total),
        0
    );

    const pendingOrders = orders.filter(
        (order: any) =>
            order.status === 'PENDING'
    ).length;

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={{
                paddingBottom: 40,
            }}
            showsVerticalScrollIndicator={false}
        >
            <Text style={styles.title}>
                Dashboard 📊
            </Text>

            <Text style={styles.subtitle}>
                Restaurant Operations Overview
            </Text>

            <View style={styles.grid}>
                <Card style={styles.statCard}>
                    <Text style={styles.icon}>
                        📦
                    </Text>

                    <Text style={styles.label}>
                        Total Orders
                    </Text>

                    <Text style={styles.value}>
                        {orders.length}
                    </Text>
                </Card>

                <Card style={styles.statCard}>
                    <Text style={styles.icon}>
                        ⏳
                    </Text>

                    <Text style={styles.label}>
                        Pending Orders
                    </Text>

                    <Text style={styles.value}>
                        {pendingOrders}
                    </Text>
                </Card>

                <Card style={styles.statCard}>
                    <Text style={styles.icon}>
                        👥
                    </Text>

                    <Text style={styles.label}>
                        Customers
                    </Text>

                    <Text style={styles.value}>
                        {customers.length}
                    </Text>
                </Card>

                <Card style={styles.statCard}>
                    <Text style={styles.icon}>
                        💶
                    </Text>

                    <Text style={styles.label}>
                        Revenue
                    </Text>

                    <Text style={styles.value}>
                        €
                        {totalRevenue.toFixed(
                            2
                        )}
                    </Text>
                </Card>
            </View>

            <Card>
                <Text
                    style={styles.summaryTitle}
                >
                    Today's Summary
                </Text>

                <View
                    style={styles.summaryRow}
                >
                    <Text
                        style={
                            styles.summaryBullet
                        }
                    >
                        •
                    </Text>
                    <Text
                        style={
                            styles.summaryText
                        }
                    >
                        {orders.length} total
                        orders processed
                    </Text>
                </View>

                <View
                    style={styles.summaryRow}
                >
                    <Text
                        style={
                            styles.summaryBullet
                        }
                    >
                        •
                    </Text>
                    <Text
                        style={
                            styles.summaryText
                        }
                    >
                        {pendingOrders} pending
                        orders awaiting
                        completion
                    </Text>
                </View>

                <View
                    style={styles.summaryRow}
                >
                    <Text
                        style={
                            styles.summaryBullet
                        }
                    >
                        •
                    </Text>
                    <Text
                        style={
                            styles.summaryText
                        }
                    >
                        {customers.length}{' '}
                        registered customers
                    </Text>
                </View>

                <View
                    style={styles.summaryRow}
                >
                    <Text
                        style={
                            styles.summaryBullet
                        }
                    >
                        •
                    </Text>
                    <Text
                        style={
                            styles.summaryText
                        }
                    >
                        €
                        {totalRevenue.toFixed(
                            2
                        )}{' '}
                        revenue generated
                    </Text>
                </View>
            </Card>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F3F4F6',
        padding: 24,
    },

    title: {
        fontSize: 36,
        fontWeight: '800',
        color: '#111827',
        marginBottom: 4,
    },

    subtitle: {
        fontSize: 16,
        color: '#6B7280',
        marginBottom: 24,
    },

    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent:
            'space-between',
    },

    statCard: {
        width: '48%',
        minHeight: 150,
        marginBottom: 16,
        justifyContent: 'center',
    },

    icon: {
        fontSize: 32,
        marginBottom: 12,
    },

    label: {
        fontSize: 14,
        color: '#6B7280',
    },

    value: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#111827',
        marginTop: 8,
    },

    summaryTitle: {
        fontSize: 22,
        fontWeight: '700',
        color: '#111827',
        marginBottom: 16,
    },

    summaryRow: {
        flexDirection: 'row',
        marginBottom: 10,
    },

    summaryBullet: {
        fontSize: 18,
        marginRight: 10,
        color: '#2563EB',
    },

    summaryText: {
        flex: 1,
        fontSize: 16,
        color: '#4B5563',
        lineHeight: 24,
    },
});