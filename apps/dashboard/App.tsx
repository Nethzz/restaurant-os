import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import { Button, SafeAreaView, View } from 'react-native';

import { MenuScreen } from './src/screens/MenuScreen';
import { OrdersScreen } from './src/screens/OrdersScreen';
import { CustomersScreen } from './src/screens/CustomersScreen';

const queryClient = new QueryClient();

function Dashboard() {
  const [screen, setScreen] = useState<'menu' | 'orders' | 'customers'>(
    'menu'
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          paddingVertical: 10,
        }}
      >
        <Button title="Menu" onPress={() => setScreen('menu')} />
        <Button title="Orders" onPress={() => setScreen('orders')} />
        <Button title="Customers" onPress={() => setScreen('customers')} />
      </View>

      {screen === 'menu' && <MenuScreen />}
      {screen === 'orders' && <OrdersScreen />}
      {screen === 'customers' && <CustomersScreen />}
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