import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import StartupScreen from '../screens/StartupScreen'; // Importa a nova tela
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import ProfileScreen from '../screens/ProfileScreen';

export type RootStackParamList = {
  Startup: undefined; // Adiciona a nova tela à lista de rotas
  Login: undefined;
  Register: undefined;
  Profile: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    // Muda a rota inicial para a StartupScreen
    <Stack.Navigator initialRouteName="Startup">
      <Stack.Screen name="Startup" component={StartupScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Register" component={RegisterScreen} options={{ title: 'Criar Conta' }} />
      <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: 'Perfis de Usuário', headerLeft: () => null }} />
    </Stack.Navigator>
  );
};

export default AppNavigator;