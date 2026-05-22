import { Pressable, StyleSheet, Text } from 'react-native';

type AppButtonProps = {
    title: string;
    onPress: () => void;
};

export function AppButton({ title, onPress }: AppButtonProps) {
    return (
        <Pressable onPress={onPress} style={styles.button}>
            <Text style={styles.text}>{title}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#2563eb',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 8,
    },
    text: {
        color: '#fff',
        fontWeight: '600',
    },
});