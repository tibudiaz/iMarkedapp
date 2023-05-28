import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { login } from '../Constant/actions';
import AsyncStorage from '@react-native-async-storage/async-storage';

const URL_AUTH_SIGNUP = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC2Hvfu4LFrONmcZZTQsahn6TZYmby1Iko';


const LoginScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch(URL_AUTH_SIGNUP, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          returnSecureToken: true,
        }),
      });

      const data = await response.json();

      if (data && data.idToken) {
        await AsyncStorage.setItem('token', data.idToken);
        dispatch(login(data.idToken));
        await AsyncStorage.setItem('userId', data.localId);
        console.log(data.localId);
        console.log('Sesión iniciada');
        navigation.navigate('User'); // Redirige a la pantalla UserScreen
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleRegister = () => {
    navigation.navigate('Register');
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Iniciar sesión</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <Button title="Iniciar sesión" onPress={handleLogin} />
        <Text style={styles.registerText} onPress={handleRegister}>
          ¿No tienes una cuenta? Regístrate
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  registerText: {
    marginTop: 16,
    color: '#888',
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;
