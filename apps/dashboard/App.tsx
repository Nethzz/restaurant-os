import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import { SafeAreaView, View } from 'react-native';

import { MenuScreen } from './src/screens/MenuScreen';
import { OrdersScreen } from './src/screens/OrdersScreen';
import { CustomersScreen } from './src/screens/CustomersScreen';
import { HomeScreen } from './src/screens/HomeScreen';
import { SettingsScreen } from './src/screens/SettingsScreen';
import { DesignSystemScreen } from './src/screens/DesignSystemScreen';

import { AppButton } from './src/components/AppButton';

const queryClient = new QueryClient();

function Dashboard() {
  const [screen, setScreen] = useState<
    'home' | 'menu' | 'orders' | 'customers' | 'settings' | 'design'
  >('home');

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f3f4f6' }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          margin: 16,
          padding: 10,
          borderRadius: 16,
          backgroundColor: '#fff',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.08,
          shadowRadius: 8,
          elevation: 4,
        }}
      >
        <AppButton title="Home" onPress={() => setScreen('home')} />
        <AppButton title="Menu" onPress={() => setScreen('menu')} />
        <AppButton title="Orders" onPress={() => setScreen('orders')} />
        <AppButton title="Customers" onPress={() => setScreen('customers')} />
        <AppButton title="Settings" onPress={() => setScreen('settings')} />
        <AppButton title="Design" onPress={() => setScreen('design')} />
      </View>

      <View style={{ flex: 1, marginHorizontal: 8, marginTop: 8 }}>
        {screen === 'menu' && <MenuScreen />}
        {screen === 'orders' && <OrdersScreen />}
        {screen === 'customers' && <CustomersScreen />}
        {screen === 'home' && <HomeScreen />}
        {screen === 'settings' && <SettingsScreen />}
        {screen === 'design' && <DesignSystemScreen />}
      </View>
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Dashboard />
    </QueryClientProvider>
  );
}