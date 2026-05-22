import { StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native';

type AppInputProps = TextInputProps & {
    label?: string;
};

export function AppInput({
    label,
    style,
    ...props
}: AppInputProps) {
    return (
        <View style={styles.container}>
            {label && <Text style={styles.label}>{label}</Text>}

            <TextInput
                {...props}
                style={[styles.input, style]}
                placeholderTextColor="#9ca3af"
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
    },
});