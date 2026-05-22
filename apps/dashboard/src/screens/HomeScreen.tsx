import { useQuery } from '@tanstack/react-query';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

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
            const response = await fetch(`${API_URL}/customers`);
            return response.json();
        },
    });

    const totalRevenue = orders.reduce(
        (sum: number, order: any) => sum + Number(order.total),
        0
    );

    const pendingOrders = orders.filter(
        (order: any) => order.status === 'PENDING'
    ).length;

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={{ paddingBottom: 40 }}
            showsVerticalScrollIndicator={false}
        >
            <Text style={styles.title}>Dashboard 📊</Text>

            <Card>
                <Text style={styles.label}>Total Orders</Text>
                <Text style={styles.value}>{orders.length}</Text>
            </Card>

            <Card>
                <Text style={styles.label}>Pending Orders</Text>
                <Text style={styles.value}>{pendingOrders}</Text>
            </Card>

            <Card>
                <Text style={styles.label}>Total Customers</Text>
                <Text style={styles.value}>{customers.length}</Text>
            </Card>

            <Card>
                <Text style={styles.label}>Total Revenue</Text>
                <Text style={styles.value}>
                    €{totalRevenue.toFixed(2)}
                </Text>
            </Card>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 24,
    },
    label: {
        fontSize: 14,
        color: '#666',
    },
    value: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 8,
    },
});