import { Button, StyleSheet, Text, View } from 'react-native';

export function DesignSystemScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Design System 🎨</Text>

            <Text style={styles.heading}>Heading Large</Text>
            <Text style={styles.subheading}>Heading Medium</Text>
            <Text style={styles.body}>
                This is an example of body text used throughout the application.
            </Text>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Buttons</Text>
                <Button title="Primary Button" onPress={() => { }} />
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Card</Text>
                <View style={styles.card}>
                    <Text>Example Card Component</Text>
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Colors</Text>

                <View style={styles.colorRow}>
                    <View style={[styles.colorBox, { backgroundColor: '#2563eb' }]} />
                    <Text>Primary Blue</Text>
                </View>

                <View style={styles.colorRow}>
                    <View style={[styles.colorBox, { backgroundColor: '#16a34a' }]} />
                    <Text>Success Green</Text>
                </View>

                <View style={styles.colorRow}>
                    <View style={[styles.colorBox, { backgroundColor: '#dc2626' }]} />
                    <Text>Error Red</Text>
                </View>
            </View>
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
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 24,
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    subheading: {
        fontSize: 18,
        fontWeight: '600',
        marginTop: 10,
    },
    body: {
        marginTop: 8,
        fontSize: 14,
    },
    section: {
        marginTop: 24,
    },
    sectionTitle: {
        fontWeight: 'bold',
        marginBottom: 10,
    },
    card: {
        padding: 20,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
    },
    colorRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    colorBox: {
        width: 24,
        height: 24,
        marginRight: 10,
        borderRadius: 4,
    },
});