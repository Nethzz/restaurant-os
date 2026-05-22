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
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          paddingVertical: 10,
        }}
      >

        <AppButton title="Home" onPress={() => setScreen('home')} />
        <AppButton title="Menu" onPress={() => setScreen('menu')} />
        <AppButton title="Orders" onPress={() => setScreen('orders')} />
        <AppButton title="Customers" onPress={() => setScreen('customers')} />
        <AppButton title="Settings" onPress={() => setScreen('settings')} />
        <AppButton title="Design" onPress={() => setScreen('design')} />
      </View>

      {screen === 'menu' && <MenuScreen />}
      {screen === 'orders' && <OrdersScreen />}
      {screen === 'customers' && <CustomersScreen />}
      {screen === 'home' && <HomeScreen />}
      {screen === 'settings' && <SettingsScreen />}
      {screen === 'design' && <DesignSystemScreen />}

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