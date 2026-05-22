import { useQuery } from '@tanstack/react-query';
import { FlatList, StyleSheet, Text, View } from 'react-native';

export function MenuScreen() {
    const { data, isLoading, error } = useQuery({
        queryKey: ['menu-items'],
        queryFn: async () => {
            const response = await fetch('http://localhost:8787/menu-items');
            return response.json();
        },
    });

    if (isLoading) {
        return (
            <View style={styles.container}>
                <Text>Loading menu...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.container}>
                <Text>Error loading menu items</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Restaurant Menu 🍕</Text>

            <FlatList
                data={data}
                keyExtractor={(item: any) => item.id.toString()}
                renderItem={({ item }: any) => (
                    <View style={styles.card}>
                        <Text style={styles.name}>{item.name}</Text>
                        <Text>€{item.price}</Text>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 60,
        paddingHorizontal: 20,
        backgroundColor: '#fff',
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
    name: {
        fontSize: 16,
        fontWeight: '600',
    },
});