import { StyleSheet, Text, View } from 'react-native';

type BadgeProps = {
    label: string;
};

export function Badge({ label }: BadgeProps) {
    let backgroundColor = '#e0e7ef';
    let textColor = '#111827';
    switch (label) {
        case 'COMPLETED':
        case 'AVAILABLE':
            backgroundColor = '#dcfce7';
            textColor = '#15803d';
            break;
        case 'PENDING':
            backgroundColor = '#fef9c3';
            textColor = '#b45309';
            break;
        case 'CANCELLED':
        case 'OUT OF STOCK':
            backgroundColor = '#fee2e2';
            textColor = '#b91c1c';
            break;
        default:
            backgroundColor = '#e0e7ef';
            textColor = '#111827';
    }
    return (
        <View style={[styles.badge, { backgroundColor }]}>
            <Text style={{ color: textColor, fontWeight: '700', fontSize: 12 }}>{label}</Text>
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