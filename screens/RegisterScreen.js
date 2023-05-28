import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { firebase } from '@firebase/app';
import '@firebase/auth';
import '@firebase/database';
import { useNavigation } from '@react-navigation/native';

const URL_AUTH_SIGNUP = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC2Hvfu4LFrONmcZZTQsahn6TZYmby1Iko';

const URL_API = 'https://imarketapp-84681-default-rtdb.firebaseio.com/';


const RegisterScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [dni, setDNI] = useState('');
    const [age, setAge] = useState('');
    const [address, setAddress] = useState('');
    const [loading, setLoading] = useState(false);
  
    const navigation = useNavigation();
  
    useEffect(() => {
      return () => {
        setLoading(false);
      };
    }, []);
  
    const handleSignUp = async () => {
      if (password !== confirmPassword) {
        Alert.alert('Error', 'Las contraseñas no coinciden');
        return;
      }
  
      setLoading(true);
  
      try {
        const response = await fetch(URL_AUTH_SIGNUP, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email,
            password: password,
            returnSecureToken: true,
          }),
        });
  
        const data = await response.json();
  
        if (response.ok) {
          const userId = data.localId;
  
          await fetch(`${URL_API}/users/${userId}.json`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              name: name,
              lastName: lastName,
              dni: dni,
              age: age,
              address: address,
              email: email,
              password: password,
            }),
          });
  
          Alert.alert('Registro exitoso', 'Ahora puedes iniciar sesión.', [
            { text: 'OK', onPress: () => navigation.navigate('Iniciar Sesion') }
          ]);
        } else if (data.error.message === 'EMAIL_EXISTS') {
          Alert.alert('Error', 'El usuario ya está registrado.', [
            { text: 'OK', onPress: () => navigation.navigate('Iniciar Sesion') }
          ]);
        } else {
          Alert.alert('Error', data.error.message);
        }
      } catch (error) {
        console.log(error);
      }
  
      setLoading(false);
    };
  
    return (
      <ScrollView>
        <View style={styles.container}>
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
          <TextInput
            style={styles.input}
            placeholder="Confirmar Contraseña"
            secureTextEntry
            value={confirmPassword}
            onChangeText={(text) => setConfirmPassword(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Nombre"
            value={name}
            onChangeText={(text) => setName(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Apellido"
            value={lastName}
            onChangeText={(text) => setLastName(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="DNI"
            value={dni}
            onChangeText={(text) => setDNI(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Edad"
            value={age}
            onChangeText={(text) => setAge(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Dirección"
            value={address}
            onChangeText={(text) => setAddress(text)}
          />
          <Button title="Registrar" onPress={handleSignUp} />
          {loading && <ActivityIndicator size="large" color="#0000ff" />}
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
  });
  
  export default RegisterScreen;