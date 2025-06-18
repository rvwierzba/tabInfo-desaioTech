// Local: frontend/src/navigation/AppNavigator.tsx

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Vamos importar as telas que nosso navegador vai usar.
// Elas ainda não existem, então o VS Code vai sublinhar em vermelho. Não se preocupe!
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import ProfileScreen from '../screens/ProfileScreen';

// Aqui definimos os nomes das nossas rotas para o TypeScript nos ajudar com a tipagem.
export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Profile: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    // O `initialRouteName` define qual tela será a primeira a ser exibida.
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ title: 'Entrar' }}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{ title: 'Criar Conta' }}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ title: 'Perfis de Usuário' }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;