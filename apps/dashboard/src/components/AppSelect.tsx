import { Pressable, StyleSheet, Text } from 'react-native';

type AppSelectProps = {
    value: string;
    onPress: () => void;
};

export function AppSelect({
    value,
    onPress,
}: AppSelectProps) {
    return (
        <Pressable style={styles.select} onPress={onPress}>
            <Text>{value}</Text>
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
});