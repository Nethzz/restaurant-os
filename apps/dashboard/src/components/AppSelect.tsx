import { Pressable, StyleSheet, Text } from 'react-native';

type AppSelectProps = {
    value: string;
    onPress: () => void;
    disabled?: boolean;
};

import { useState } from 'react';

export function AppSelect({ value, onPress, disabled = false }: AppSelectProps) {
    const [focused, setFocused] = useState(false);
    return (
        <Pressable
            style={({ pressed }) => [
                styles.select,
                focused && styles.selectFocused,
                pressed && !disabled && styles.selectPressed,
                disabled && styles.selectDisabled,
            ]}
            onPress={disabled ? undefined : onPress}
            disabled={disabled}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
        >
            <Text style={disabled ? { color: '#9ca3af' } : undefined}>{value}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    select: {
        borderWidth: 1,
        borderColor: '#d1d5db',
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 12,
        backgroundColor: '#fff',
        marginBottom: 12,
    },
    selectFocused: {
        borderColor: '#2563eb',
        shadowColor: '#2563eb',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
        elevation: 2,
    },
    selectPressed: {
        backgroundColor: '#f3f4f6',
    },
    selectDisabled: {
        backgroundColor: '#f3f4f6',
        borderColor: '#e5e7eb',
    },
});