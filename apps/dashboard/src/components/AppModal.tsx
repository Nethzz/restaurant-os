import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';

type AppModalProps = {
    visible: boolean;
    title: string;
    onClose: () => void;
    children: React.ReactNode;
};

export function AppModal({
    visible,
    title,
    onClose,
    children,
}: AppModalProps) {
    return (
        <Modal visible={visible} transparent animationType="slide">
            <View style={styles.overlay}>
                <View style={styles.content}>
                    <Text style={styles.title}>{title}</Text>

                    {children}

                    <Pressable style={styles.closeButton} onPress={onClose}>
                        <Text style={styles.closeText}>Close</Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.3)',
        padding: 20,
    },
    content: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    closeButton: {
        marginTop: 20,
        padding: 10,
        backgroundColor: '#2563eb',
        borderRadius: 8,
    },
    closeText: {
        color: '#fff',
        textAlign: 'center',
    },
});