import { StyleSheet, Text, View } from 'react-native';

type BadgeProps = {
    label: string;
};

export function Badge({ label }: BadgeProps) {
    const backgroundColor =
        label === 'COMPLETED'
            ? '#dcfce7'
            : label === 'PENDING'
                ? '#fef9c3'
                : '#fee2e2';

    return (
        <View style={[styles.badge, { backgroundColor }]}>
            <Text>{label}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    badge: {
        alignSelf: 'flex-start',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 20,
        marginTop: 6,
    },
});