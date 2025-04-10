import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import BoardScreen from './src/screens/BoardScreen';
import CardModal from './src/components/CardModal';
import { LogBox } from 'react-native';

const Stack = createStackNavigator();

export default function App() {
  LogBox.ignoreAllLogs();
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: '#026AA7' }, headerTintColor: '#FFFFFF', headerTitleAlign: 'center' }}>
        <Stack.Screen name="Board" component={BoardScreen} />
        <Stack.Group screenOptions={{ presentation: 'modal' }}>
          <Stack.Screen name="CardModal" component={CardModal} />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
}