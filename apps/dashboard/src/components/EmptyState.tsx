import { Text, View } from 'react-native';

type EmptyStateProps = {
    message: string;
};

export function EmptyState({ message }: EmptyStateProps) {
    return (
        <View style={{ padding: 20 }}>
            <Text>{message}</Text>
        </View>
    );
}