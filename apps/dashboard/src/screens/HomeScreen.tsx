import { useQuery } from '@tanstack/react-query';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

export function HomeScreen() {
    const { data: orders = [] } = useQuery({
        queryKey: ['orders'],
        queryFn: async () => {
            const response = await fetch('http://localhost:8787/orders');
            return response.json();
        },
    });

    const { data: customers = [] } = useQuery({
        queryKey: ['customers'],
        queryFn: async () => {
            const response = await fetch('http://localhost:8787/customers');
            return response.json();
        },
    });

    const totalRevenue = orders.reduce(
        (sum: number, order: any) => sum + Number(order.total),
        0
    );

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={{ paddingBottom: 40 }}
            showsVerticalScrollIndicator={false}
        >
            <Text style={styles.title}>Dashboard 📊</Text>

            <View style={styles.card}>
                <Text style={styles.label}>Total Orders</Text>
                <Text style={styles.value}>{orders.length}</Text>
            </View>

            <View style={styles.card}>
                <Text style={styles.label}>Total Customers</Text>
                <Text style={styles.value}>{customers.length}</Text>
            </View>

            <View style={styles.card}>
                <Text style={styles.label}>Total Revenue</Text>
                <Text style={styles.value}>€{totalRevenue.toFixed(2)}</Text>
            </View>
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
    card: {
        padding: 20,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
        marginBottom: 16,
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