import { useQuery } from '@tanstack/react-query';
import { FlatList, StyleSheet, Text, View } from 'react-native';

export function CustomersScreen() {
    const { data, isLoading, error } = useQuery({
        queryKey: ['customers'],
        queryFn: async () => {
            const response = await fetch('http://localhost:8787/customers');
            return response.json();
        },
    });

    if (isLoading) {
        return (
            <View style={styles.container}>
                <Text>Loading customers...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.container}>
                <Text>Error loading customers</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Customers 👥</Text>

            <FlatList
                data={data}
                keyExtractor={(item: any) => item.id.toString()}
                renderItem={({ item }: any) => (
                    <View style={styles.card}>
                        <Text>{item.name}</Text>
                        <Text>{item.email}</Text>
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