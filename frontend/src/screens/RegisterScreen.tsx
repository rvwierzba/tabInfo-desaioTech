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
ScrollView,
ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import apiClient from '../api/client';

const RegisterScreen = () => {
const navigation = useNavigation();

const [name, setName] = useState('');
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [loading, setLoading] = useState(false);

const handleRegister = async () => {
if (!name || !email || !password) {
Alert.alert('Erro', 'Por favor, preencha todos os campos.');
return;
}

setLoading(true);

try {
  const response = await apiClient.post('/register', {
    name,
    email,
    password,
  });

  Alert.alert('Sucesso!', response.data.message);
  navigation.goBack();
} catch (error: any) {
  console.error('Erro no cadastro:', error.response?.data || error.message);

  const errorMessage =
    error.response?.data?.message ||
    'Não foi possível completar o cadastro. Tente novamente.';
  Alert.alert('Erro no Cadastro', errorMessage);
} finally {
  setLoading(false);
}

};

return (
<ScrollView
contentContainerStyle={styles.container}
keyboardShouldPersistTaps="handled">
<Image
source={require('../assets/images/Logo v1.png')}
style={styles.logo}
resizeMode="contain"
/>
<Text style={styles.title}>Crie sua Conta</Text>

  <TextInput
    style={styles.input}
    placeholder="Seu nome completo"
    value={name}
    onChangeText={setName}
    autoCapitalize="words"
    editable={!loading}
  />
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
    placeholder="Crie uma senha forte"
    value={password}
    onChangeText={setPassword}
    secureTextEntry
    editable={!loading}
  />

  <View style={styles.buttonContainer}>
    {loading ? (
      <ActivityIndicator size="large" color="#28a745" />
    ) : (
      <Button title="Cadastrar" onPress={handleRegister} color="#28a745" />
    )}
  </View>

  <TouchableOpacity
    style={styles.linkContainer}
    onPress={() => navigation.goBack()}
    disabled={loading}
  >
    <Text style={styles.linkText}>Já tem uma conta? Faça o login!</Text>
  </TouchableOpacity>
</ScrollView>

);
};

const styles = StyleSheet.create({
container: {
flexGrow: 1,
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
paddingBottom: 20,
},
linkText: {
color: '#007BFF',
fontSize: 16,
fontWeight: '500',
},
});

export default RegisterScreen;