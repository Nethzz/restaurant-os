import { Text, View, StyleSheet } from 'react-native';

import { AppModal } from './AppModal';
import { Badge } from './Badge';

type Props = {
    visible: boolean;
    onClose: () => void;
    order: any;
};

export function OrderDetailsModal({
    visible,
    onClose,
    order,
}: Props) {
    if (!order) {
        return null;
    }

    return (
        <AppModal
            visible={visible}
            title={`Order #${order.id}`}
            onClose={onClose}
        >
            <View style={styles.section}>
                <Text style={styles.label}>
                    Status
                </Text>

                <Badge label={order.status} />
            </View>

            <View style={styles.section}>
                <Text style={styles.label}>
                    Customer ID
                </Text>

                <Text>
                    {order.customerId ?? 'N/A'}
                </Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.label}>
                    Total
                </Text>

                <Text style={styles.price}>
                    €{order.total}
                </Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.label}>
                    Created At
                </Text>

                <Text>
                    {order.createdAt
                        ? new Date(
                            order.createdAt
                        ).toLocaleString()
                        : 'N/A'}
                </Text>
            </View>
        </AppModal>
    );
}

const styles = StyleSheet.create({
    section: {
        marginBottom: 16,
    },
    label: {
        fontWeight: '600',
        marginBottom: 6,
    },
    price: {
        fontSize: 22,
        fontWeight: '700',
    },
});