import React, { useState } from 'react';
import {
View,
Text,
TextInput,
StyleSheet,
Image,
TouchableOpacity,
Alert,
Button,
ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import apiClient from '../api/client';
import AsyncStorage from '@react-native-async-storage/async-storage';

type LoginScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Login'
>;

const LoginScreen = () => {
const navigation = useNavigation<LoginScreenNavigationProp>();

const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [loading, setLoading] = useState(false);

const handleLogin = async () => {
if (!email || !password) {
Alert.alert('Erro', 'Por favor, preencha o e-mail e a senha.');
return;
}

setLoading(true);

try {
  const response = await apiClient.post('/login', {
    email,
    password,
  });

  const { token } = response.data;

  if (token) {
    await AsyncStorage.setItem('userToken', token);
    navigation.navigate('Profile');
  } else {
    throw new Error('Token não recebido da API.');
  }
} catch (error: any) {
  console.error('Erro no login:', error.response?.data || error.message);
  const errorMessage =
    error.response?.data?.message ||
    'Não foi possível fazer o login. Verifique suas credenciais.';
  Alert.alert('Erro no Login', errorMessage);
} finally {
  setLoading(false);
}

};

return (
<View style={styles.container}>
<Image
source={require('../assets/images/Logo v1.png')}
style={styles.logo}
resizeMode="contain"
/>
<Text style={styles.title}>Acesse sua Conta</Text>

  <TextInput
    style={styles.input}
    placeholder="Seu e-mail"
    value={email}
    onChangeText={setEmail}
    keyboardType="email-address"
    autoCapitalize="none"
    editable={!loading}
  />
  <TextInput
    style={styles.input}
    placeholder="Sua senha"
    value={password}
    onChangeText={setPassword}
    secureTextEntry
    editable={!loading}
  />

  <View style={styles.buttonContainer}>
    {loading ? (
      <ActivityIndicator size="large" color="#007BFF" />
    ) : (
      <Button title="Entrar" onPress={handleLogin} color="#007BFF" />
    )}
  </View>

  <TouchableOpacity
    style={styles.linkContainer}
    onPress={() => navigation.navigate('Register')}
    disabled={loading}>
    <Text style={styles.linkText}>
      Não tem uma conta? Crie uma agora!
    </Text>
  </TouchableOpacity>
</View>

);
};

const styles = StyleSheet.create({
container: {
flex: 1,
justifyContent: 'center',
alignItems: 'center',
paddingHorizontal: 20,
backgroundColor: '#f5f5f5',
},
logo: {
width: 250,
height: 120,
marginBottom: 48,
},
title: {
fontSize: 26,
fontWeight: 'bold',
color: '#333',
marginBottom: 24,
},
input: {
width: '100%',
height: 50,
backgroundColor: '#fff',
borderColor: '#ddd',
borderWidth: 1,
borderRadius: 8,
paddingHorizontal: 15,
marginBottom: 15,
fontSize: 16,
},
buttonContainer: {
width: '100%',
marginTop: 10,
height: 50,
justifyContent: 'center',
},
linkContainer: {
marginTop: 20,
},
linkText: {
color: '#007BFF',
fontSize: 16,
fontWeight: '500',
},
});

export default LoginScreen;