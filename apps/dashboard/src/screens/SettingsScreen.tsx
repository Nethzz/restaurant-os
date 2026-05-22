import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    View,
} from 'react-native';

import { AppButton } from '../components/AppButton';
import { AppInput } from '../components/AppInput';
import { Card } from '../components/Card';
import { LoadingState } from '../components/LoadingState';
import { API_URL } from '../config/api';

export function SettingsScreen() {
    const {
        data = [],
        isLoading,
        refetch,
    } = useQuery({
        queryKey: ['settings'],
        queryFn: async () => {
            const response = await fetch(
                `${API_URL}/settings`
            );

            return response.json();
        },
    });

    const settings = data[0];

    const [prepTime, setPrepTime] =
        useState('');

    const [
        autoAcceptOrders,
        setAutoAcceptOrders,
    ] = useState(false);

    const [message, setMessage] =
        useState('');

    useEffect(() => {
        if (settings) {
            setPrepTime(
                String(
                    settings.prepTimeMinutes ??
                    ''
                )
            );

            setAutoAcceptOrders(
                settings.autoAcceptOrders ??
                false
            );
        }
    }, [settings]);

    const handleSave = async () => {
        try {
            setMessage('');

            const response = await fetch(
                `${API_URL}/settings`,
                {
                    method: 'PATCH',
                    headers: {
                        'Content-Type':
                            'application/json',
                    },
                    body: JSON.stringify({
                        prepTimeMinutes:
                            Number(prepTime),
                        autoAcceptOrders,
                    }),
                }
            );

            if (!response.ok) {
                throw new Error(
                    'Failed to save settings'
                );
            }

            setMessage(
                '✅ Settings updated successfully'
            );

            await refetch();
        } catch (error) {
            console.error(error);

            setMessage(
                '❌ Failed to update settings'
            );
        }
    };

    if (isLoading) {
        return <LoadingState />;
    }

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={{
                paddingBottom: 40,
            }}
            showsVerticalScrollIndicator={
                false
            }
        >
            <Text style={styles.title}>
                Settings ⚙️
            </Text>

            <Card>
                <Text style={styles.label}>
                    Preparation Time (minutes)
                </Text>

                <AppInput
                    value={prepTime}
                    onChangeText={setPrepTime}
                    placeholder="15"
                />
            </Card>

            <Card>
                <View
                    style={styles.switchRow}
                >
                    <View
                        style={{ flex: 1 }}
                    >
                        <Text
                            style={
                                styles.label
                            }
                        >
                            Auto Accept Orders
                        </Text>

                        <Text
                            style={
                                styles.description
                            }
                        >
                            Automatically accept
                            incoming orders
                        </Text>
                    </View>

                    <Switch
                        value={
                            autoAcceptOrders
                        }
                        onValueChange={
                            setAutoAcceptOrders
                        }
                    />
                </View>
            </Card>

            {message ? (
                <Text
                    style={[
                        styles.message,
                        message.includes('❌') && {
                            color: '#dc2626',
                        },
                    ]}
                >
                    {message}
                </Text>
            ) : null}

            <AppButton
                title="💾 Save Settings"
                onPress={handleSave}
            />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f8fafc',
    },

    title: {
        fontSize: 28,
        fontWeight: '700',
        marginBottom: 20,
    },

    label: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 8,
    },

    description: {
        color: '#64748b',
        fontSize: 13,
        marginTop: 4,
    },

    switchRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    message: {
        marginBottom: 12,
        fontWeight: '600',
        color: '#16a34a',
    },
});