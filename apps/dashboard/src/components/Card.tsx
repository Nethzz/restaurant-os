import { ReactNode } from 'react';
import {
    StyleSheet,
    View,
    ViewStyle,
} from 'react-native';

type CardProps = {
    children: ReactNode;
    style?: ViewStyle;
};

export function Card({
    children,
    style,
}: CardProps) {
    return (
        <View style={[styles.card, style]}>
            {children}
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        padding: 16,
        marginBottom: 16,
        borderRadius: 12,
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderColor: '#e5e7eb',

        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.05,
        shadowRadius: 4,

        elevation: 2,
    },
});