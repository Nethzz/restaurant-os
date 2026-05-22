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
                    <View style={[styles.colorBox, { backgroundColor: '#2563eb' }]} />
                    <Text>Primary Blue</Text>
                </View>
                <View style={styles.colorRow}>
                    <View style={[styles.colorBox, { backgroundColor: '#16a34a' }]} />
                    <Text>Success Green</Text>
                </View>
                <View style={styles.colorRow}>
                    <View style={[styles.colorBox, { backgroundColor: '#dc2626' }]} />
                    <Text>Error Red</Text>
                </View>
                <View style={styles.colorRow}>
                    <View style={[styles.colorBox, { backgroundColor: '#facc15' }]} />
                    <Text>Warning Yellow</Text>
                </View>
                <View style={styles.colorRow}>
                    <View style={[styles.colorBox, { backgroundColor: '#f3f4f6', borderWidth: 1, borderColor: '#e5e7eb' }]} />
                    <Text>Background</Text>
                </View>
                <View style={styles.colorRow}>
                    <View style={[styles.colorBox, { backgroundColor: '#fff', borderWidth: 1, borderColor: '#e5e7eb' }]} />
                    <Text>Surface</Text>
                </View>
            </Card>

            {/* Spacing Tokens */}
            <Card>
                <Text style={styles.sectionTitle}>Spacing Scale</Text>
                <View style={{ flexDirection: 'row', alignItems: 'flex-end', marginBottom: 8 }}>
                    {[0, 4, 8, 12, 16, 20, 24, 32, 40].map((s, i) => (
                        <View key={i} style={{ width: s, height: 16, backgroundColor: '#2563eb', marginRight: 8, borderRadius: 4 }} />
                    ))}
                </View>
                <Text style={styles.bodyText}>0, 4, 8, 12, 16, 20, 24, 32, 40</Text>
            </Card>

            {/* Radius Tokens */}
            <Card>
                <Text style={styles.sectionTitle}>Radius Tokens</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                    {[0, 4, 8, 12, 16].map((r, i) => (
                        <View key={i} style={{ width: 32, height: 32, backgroundColor: '#f59e42', borderRadius: r, marginRight: 8 }} />
                    ))}
                </View>
                <Text style={styles.bodyText}>0, 4, 8, 12, 16</Text>
            </Card>

            {/* Shadow/Elevation Tokens */}
            <Card>
                <Text style={styles.sectionTitle}>Shadow/Elevation</Text>
                <View style={{ width: 64, height: 32, backgroundColor: '#fff', borderRadius: 8, marginVertical: 8, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 8, elevation: 4 }} />
                <Text style={styles.bodyText}>Subtle shadow for surfaces and cards</Text>
            </Card>

            {/* Table/List Demo */}
            <Card>
                <Text style={styles.sectionTitle}>Table/List Demo</Text>
                <View style={{ borderWidth: 1, borderColor: '#e5e7eb', borderRadius: 8, overflow: 'hidden' }}>
                    <View style={{ flexDirection: 'row', backgroundColor: '#f3f4f6' }}>
                        <Text style={{ flex: 1, fontWeight: '700', padding: 8 }}>Name</Text>
                        <Text style={{ flex: 1, fontWeight: '700', padding: 8 }}>Status</Text>
                    </View>
                    <View style={{ flexDirection: 'row', borderTopWidth: 1, borderColor: '#e5e7eb' }}>
                        <Text style={{ flex: 1, padding: 8 }}>Margherita Pizza</Text>
                        <Text style={{ flex: 1, padding: 8 }}><Badge label="AVAILABLE" /></Text>
                    </View>
                    <View style={{ flexDirection: 'row', borderTopWidth: 1, borderColor: '#e5e7eb' }}>
                        <Text style={{ flex: 1, padding: 8 }}>Veggie Burger</Text>
                        <Text style={{ flex: 1, padding: 8 }}><Badge label="OUT OF STOCK" /></Text>
                    </View>
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