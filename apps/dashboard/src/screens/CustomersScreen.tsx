import { useQuery } from '@tanstack/react-query';
import { FlatList, StyleSheet, Text, View } from 'react-native';

import { Card } from '../components/Card';
import { EmptyState } from '../components/EmptyState';
import { LoadingState } from '../components/LoadingState';

export function CustomersScreen() {
    const { data, isLoading, error } = useQuery({
        queryKey: ['customers'],
        queryFn: async () => {
            const response = await fetch('http://localhost:8787/customers');
            return response.json();
        },
    });

    if (isLoading) {
        return <LoadingState />;
    }

    if (error) {
        return (
            <View style={styles.container}>
                <Text>Error loading customers</Text>
            </View>
        );
    }

    if (!data?.length) {
        return <EmptyState message="No customers found" />;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Customers 👥</Text>

            <FlatList
                data={data}
                keyExtractor={(item: any) => item.id.toString()}
                renderItem={({ item }: any) => (
                    <Card>
                        <Text style={styles.name}>{item.name}</Text>
                        <Text>{item.email}</Text>
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
    name: {
        fontWeight: '600',
        marginBottom: 4,
    },
});