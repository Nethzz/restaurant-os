import { Pressable, StyleSheet, Text } from 'react-native';

type AppButtonProps = {
    title: string;
    onPress: () => void;
    disabled?: boolean;
    loading?: boolean;
    accessibilityLabel?: string;
};

export function AppButton({ title, onPress, disabled = false, loading = false, accessibilityLabel }: AppButtonProps) {
    return (
        <Pressable
            onPress={disabled || loading ? undefined : onPress}
            disabled={disabled || loading}
            accessibilityLabel={accessibilityLabel || title}
            style={({ pressed }) => [
                styles.button,
                pressed && !disabled && !loading && styles.buttonPressed,
                (disabled || loading) && styles.buttonDisabled,
            ]}
        >
            {loading ? (
                <Text style={styles.text}>...</Text>
            ) : (
                <Text style={styles.text}>{title}</Text>
            )}
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#2563eb',
        paddingHorizontal: 18,
        paddingVertical: 10,
        borderRadius: 10,
        marginHorizontal: 2,
        minWidth: 70,
        alignItems: 'center',
        shadowColor: '#2563eb',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.12,
        shadowRadius: 4,
        elevation: 2,
        // transitionDuration is not supported in React Native StyleSheet
    },
    buttonPressed: {
        backgroundColor: '#1e40af',
        opacity: 0.85,
    },
    buttonDisabled: {
        backgroundColor: '#a5b4fc',
        opacity: 0.6,
        shadowOpacity: 0.05,
    },
    text: {
        color: '#fff',
        fontWeight: '700',
        fontSize: 16,
        letterSpacing: 0.5,
    },
});