import { useQuery } from '@tanstack/react-query';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

export function SettingsScreen() {
    const { data = [] } = useQuery({
        queryKey: ['settings'],
        queryFn: async () => {
            const response = await fetch('http://localhost:8787/settings');
            return response.json();
        },
    });

    const settings = data[0];

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={{ paddingBottom: 40 }}
            showsVerticalScrollIndicator={false}
        >
            <Text style={styles.title}>Settings ⚙️</Text>

            {settings && (
                <>
                    <View style={styles.card}>
                        <Text>Preparation Time</Text>
                        <Text>{settings.prepTimeMinutes} min</Text>
                    </View>

                    <View style={styles.card}>
                        <Text>Auto Accept Orders</Text>
                        <Text>
                            {settings.autoAcceptOrders ? 'Enabled' : 'Disabled'}
                        </Text>
                    </View>
                </>
            )}
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
        marginBottom: 20,
    },
    card: {
        padding: 20,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
        marginBottom: 16,
    },
});