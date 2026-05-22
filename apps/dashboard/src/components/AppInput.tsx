import { StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native';
import { useState } from 'react';

type AppInputProps = TextInputProps & {
    label?: string;
};

export function AppInput({
    label,
    style,
    editable = true,
    ...props
}: AppInputProps) {
    const [focused, setFocused] = useState(false);
    return (
        <View style={styles.container}>
            {label && <Text style={styles.label}>{label}</Text>}
            <TextInput
                {...props}
                editable={editable}
                style={[
                    styles.input,
                    focused && styles.inputFocused,
                    !editable && styles.inputDisabled,
                    style,
                ]}
                placeholderTextColor="#9ca3af"
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 12,
    },
    label: {
        marginBottom: 6,
        fontWeight: '600',
    },
    input: {
        borderWidth: 1,
        borderColor: '#d1d5db',
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 10,
        backgroundColor: '#fff',
        color: '#111827',
    },
    inputFocused: {
        borderColor: '#2563eb',
        shadowColor: '#2563eb',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
        elevation: 2,
    },
    inputDisabled: {
        backgroundColor: '#f3f4f6',
        color: '#9ca3af',
        borderColor: '#e5e7eb',
    },
});