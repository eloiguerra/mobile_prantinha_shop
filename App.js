import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'

import Home from './src/pages/Home'
import Plant from './src/pages/Plant'

export default function App() {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name = "Home" component = {Home} />
        <Stack.Screen name = "Plant" component = {Plant} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
