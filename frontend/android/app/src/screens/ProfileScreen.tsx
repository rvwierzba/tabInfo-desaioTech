// Local: frontend/src/screens/ProfileScreen.tsx

import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Button,
  Alert,
  SafeAreaView,
  ActivityIndicator, // Para mostrar o loading
} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native'; // Importamos useFocusEffect
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import apiClient from '../api/client';
import AsyncStorage from '@react-native-async-storage/async-storage';

type ProfileScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Profile'
>;

type User = {
  id: number;
  name: string;
  email: string;
};

const ProfileScreen = () => {
  const navigation = useNavigation<ProfileScreenNavigationProp>();

  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true); // Começa carregando

  // Função que busca os usuários na API
  const fetchUsers = async () => {
    setLoading(true);
    try {
      // 1. Pega o token salvo no dispositivo
      const token = await AsyncStorage.getItem('userToken');
      if (!token) {
        // Se não houver token, desloga o usuário
        handleLogout();
        return;
      }

      // 2. Faz a chamada para a API, enviando o token no cabeçalho
      const response = await apiClient.get('/users', {
        headers: {
          Authorization: `Bearer ${token}`, // É aqui que a "mágica" acontece
        },
      });

      // 3. Preenche o estado com a lista de usuários recebida
      setUsers(response.data.users);
    } catch (error: any) {
      console.error('Erro ao buscar usuários:', error.response?.data || error.message);
      Alert.alert('Sessão Inválida', 'Sua sessão expirou. Por favor, faça o login novamente.');
      handleLogout(); // Se der erro (ex: token inválido), desloga
    } finally {
      setLoading(false);
    }
  };

  // useFocusEffect é um hook que roda toda vez que a tela entra em foco.
  // É melhor que o useEffect neste caso para garantir que a lista esteja sempre atualizada.
  useFocusEffect(
    React.useCallback(() => {
      fetchUsers();
    }, []),
  );

  // Função de Logout agora limpa o token do dispositivo
  const handleLogout = async () => {
    await AsyncStorage.removeItem('userToken');
    navigation.navigate('Login'); // Redireciona para a tela de login
  };

  // Componente para renderizar cada item da lista
  const renderUserItem = ({ item }: { item: User }) => (
    <View style={styles.userItem}>
      <Text style={styles.userName}>{item.name}</Text>
      <Text style={styles.userEmail}>{item.email}</Text>
    </View>
  );

  // Enquanto carrega, exibe um spinner
  if (loading) {
    return (
      <View style={[styles.container, styles.horizontal]}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={users}
        renderItem={renderUserItem}
        keyExtractor={item => item.id.toString()}
        ListHeaderComponent={
          <Text style={styles.header}>Usuários Cadastrados</Text>
        }
        // Adiciona a funcionalidade de "puxar para atualizar"
        onRefresh={fetchUsers}
        refreshing={loading}
      />
      <View style={styles.logoutButton}>
        <Button title="Sair (Logout)" onPress={handleLogout} color="#dc3545" />
      </View>
    </SafeAreaView>
  );
};

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  horizontal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginVertical: 20,
  },
  userItem: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  userEmail: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  logoutButton: {
    marginHorizontal: 16,
    marginVertical: 10,
  },
});

export default ProfileScreen;