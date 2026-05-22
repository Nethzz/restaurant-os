import { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

type CardProps = {
    children: ReactNode;
};

export function Card({ children }: CardProps) {
    return <View style={styles.card}>{children}</View>;
}

const styles = StyleSheet.create({
    card: {
        padding: 16,
        marginBottom: 16,
        borderRadius: 12,
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderColor: '#e5e7eb',
    },
});