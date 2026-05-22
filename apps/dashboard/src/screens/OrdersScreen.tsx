import { useQuery } from '@tanstack/react-query';
import { FlatList, StyleSheet, Text, View } from 'react-native';

export function OrdersScreen() {
    const { data, isLoading, error } = useQuery({
        queryKey: ['orders'],
        queryFn: async () => {
            const response = await fetch('http://localhost:8787/orders');
            return response.json();
        },
    });

    if (isLoading) {
        return (
            <View style={styles.container}>
                <Text>Loading orders...</Text>
            </View>
        );
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
            <Text style={styles.title}>Orders 📦</Text>

            <FlatList
                data={data}
                keyExtractor={(item: any) => item.id.toString()}
                renderItem={({ item }: any) => (
                    <View style={styles.card}>
                        <Text>Order #{item.id}</Text>
                        <Text>Status: {item.status}</Text>
                        <Text>Total: €{item.total}</Text>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    card: {
        padding: 16,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
    },
});