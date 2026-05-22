import { useState } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import { AppButton } from '../components/AppButton';
import { AppModal } from '../components/AppModal';
import { Card } from '../components/Card';
import { Badge } from '../components/Badge';
import { AppInput } from '../components/AppInput';
import { AppSelect } from '../components/AppSelect';

export function DesignSystemScreen() {
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <ScrollView
            style={styles.container}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.content}
        >
            <Text style={styles.pageTitle}>Design System 🎨</Text>

            {/* Typography */}
            <Card>
                <Text style={styles.sectionTitle}>Typography</Text>

                <Text style={styles.headingLarge}>Heading Large</Text>

                <Text style={styles.headingMedium}>Heading Medium</Text>

                <Text style={styles.bodyText}>
                    This is body text used across the application for descriptions and
                    content.
                </Text>
            </Card>

            {/* Buttons */}
            <Card>
                <Text style={styles.sectionTitle}>Buttons</Text>

                <AppButton
                    title="Open Modal"
                    onPress={() => setModalVisible(true)}
                />
            </Card>

            {/* Status Badges */}
            <Card>
                <Text style={styles.sectionTitle}>Status Badges</Text>

                <View style={styles.row}>
                    <Badge label="PENDING" />
                    <Badge label="COMPLETED" />
                    <Badge label="CANCELLED" />
                </View>
            </Card>

            {/* Card Example */}
            <Card>
                <Text style={styles.sectionTitle}>Card Component</Text>

                <Text style={styles.bodyText}>
                    Reusable card surface used across Orders, Customers, Home and
                    Settings.
                </Text>
            </Card>

            {/* Colors */}
            <Card>
                <Text style={styles.sectionTitle}>Color Tokens</Text>

                <View style={styles.colorRow}>
                    <View
                        style={[
                            styles.colorBox,
                            { backgroundColor: '#2563eb' },
                        ]}
                    />
                    <Text>Primary Blue</Text>
                </View>

                <View style={styles.colorRow}>
                    <View
                        style={[
                            styles.colorBox,
                            { backgroundColor: '#16a34a' },
                        ]}
                    />
                    <Text>Success Green</Text>
                </View>

                <View style={styles.colorRow}>
                    <View
                        style={[
                            styles.colorBox,
                            { backgroundColor: '#dc2626' },
                        ]}
                    />
                    <Text>Error Red</Text>
                </View>
            </Card>

            {/* Form Controls */}
            <Card>
                <Text style={styles.sectionTitle}>Form Controls</Text>

                <AppInput
                    label="Restaurant Name"
                    placeholder="Enter name"
                />

                <AppSelect
                    value="Select Category"
                    onPress={() => { }}
                />
            </Card>

            {/* Modal */}
            <AppModal
                visible={modalVisible}
                title="Example Modal"
                onClose={() => setModalVisible(false)}
            >
                <Text style={styles.bodyText}>
                    This modal demonstrates a reusable dialog component.
                </Text>
            </AppModal>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f8fafc',
    },
    content: {
        paddingBottom: 40,
    },

    pageTitle: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 20,
    },

    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        marginBottom: 12,
    },

    headingLarge: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
    },

    headingMedium: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 8,
    },

    bodyText: {
        fontSize: 14,
        lineHeight: 20,
        color: '#374151',
    },

    row: {
        flexDirection: 'row',
        gap: 8,
        flexWrap: 'wrap',
    },

    colorRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },

    colorBox: {
        width: 24,
        height: 24,
        borderRadius: 6,
        marginRight: 12,
    },
});