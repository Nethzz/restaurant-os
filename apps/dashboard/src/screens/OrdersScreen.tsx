import { useQuery } from '@tanstack/react-query';
import { FlatList, StyleSheet, Text, View } from 'react-native';

import { Badge } from '../components/Badge';
import { Card } from '../components/Card';
import { EmptyState } from '../components/EmptyState';
import { LoadingState } from '../components/LoadingState';

export function OrdersScreen() {
    const { data, isLoading, error } = useQuery({
        queryKey: ['orders'],
        queryFn: async () => {
            const response = await fetch('http://localhost:8787/orders');
            return response.json();
        },
    });

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

    if (!data?.length) {
        return <EmptyState message="No orders found" />;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Orders 📦</Text>

            <FlatList
                data={data}
                keyExtractor={(item: any) => item.id.toString()}
                renderItem={({ item }: any) => (
                    <Card>
                        <Text>Order #{item.id}</Text>

                        <Badge label={item.status} />

                        <Text style={styles.total}>Total: €{item.total}</Text>
                    </Card>
                )}
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
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    total: {
        marginTop: 8,
    },
});