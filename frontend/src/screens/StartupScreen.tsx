import React, { useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type StartupNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const StartupScreen = () => {
  const navigation = useNavigation<StartupNavigationProp>();

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        // Se houver token, vai para Perfil. Se não, vai para Login.
        if (token) {
          navigation.reset({ index: 0, routes: [{ name: 'Profile' }] });
        } else {
          navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
        }
      } catch (e) {
        console.error('Falha ao buscar token', e);
        navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
      }
    };

    checkToken();
  }, []);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});

export default StartupScreen;