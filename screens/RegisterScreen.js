

import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, ScrollView, Alert, ActivityIndicator, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

import { storage } from '../firebaseConfig';

console.log(storage);

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
  const [photo, setPhoto] = useState(null);
  const [city, setCity] = useState('');

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

    if (!photo) {
      Alert.alert('Error', 'Debes tomar una foto para el registro');
      return;
    }

    if (!city) {
      Alert.alert('Error', 'No se pudo obtener la ubicación actual');
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
        const user = {
          name: name,
          lastName: lastName,
          dni: dni,
          age: age,
          address: address,
          email: email,
          password: password,
        };

        await fetch(`${URL_API}/users/${userId}.json`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(user),
        });

        await uploadPhoto(userId, user);

        Alert.alert('Registro exitoso', 'Ahora puedes iniciar sesión.', [
          { text: 'OK', onPress: () => navigation.navigate('Iniciar Sesion') },
        ]);
      } else if (data.error.message === 'EMAIL_EXISTS') {
        Alert.alert('Error', 'El usuario ya está registrado.', [
          { text: 'OK', onPress: () => navigation.navigate('Iniciar Sesion') },
        ]);
      } else {
        Alert.alert('Error', data.error.message);
      }
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  const handleTakePhoto = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Permisos insuficientes',
        'Debes permitir el acceso a la cámara para tomar una foto.'
      );
      return;
    }
  
    const photoResult = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
  
    if (!photoResult.canceled) {
      setPhoto(photoResult.assets[0].uri);
    }
  };
  
  const uploadPhoto = async (userId, user) => {
    if (!photo) {
      Alert.alert('No se ha seleccionado ninguna foto', 'Por favor, toma una foto antes de subirla.');
      return;
    }
  
    const response = await fetch(photo);
    const blob = await response.blob();
    const storageRef = storage.ref().child(`users/${userId}/photo.jpg`);
    await storageRef.put(blob);
  };

  const handleGetLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permisos insuficientes', 'Debes permitir el acceso a la ubicación para obtener la ciudad actual.');
      return;
    }

    const location = await Location.getCurrentPositionAsync({});
    const { coords } = location;
    const { latitude, longitude } = coords;

    const reverseGeocode = await Location.reverseGeocodeAsync({ latitude, longitude });
    if (reverseGeocode.length > 0) {
      const { city } = reverseGeocode[0];
      setCity(city);
    } else {
      Alert.alert('Error', 'No se pudo obtener la ciudad actual.');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.form}>
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
        <TextInput
          style={styles.input}
          placeholder="Correo electrónico"
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
          placeholder="Confirmar contraseña"
          secureTextEntry
          value={confirmPassword}
          onChangeText={(text) => setConfirmPassword(text)}
        />
        <View style={styles.photoContainer}>
          {photo ? (
            <Image source={{ uri: photo }} style={styles.photo} />
          ) : (
            <Button title="Tomar foto" onPress={handleTakePhoto} />
          )}
        </View>
        <Button title="Obtener ubicación" onPress={handleGetLocation} />
        {loading ? (
          <ActivityIndicator style={styles.loading} size="large" color="blue" />
        ) : (
          <Button title="Registrarse" onPress={handleSignUp} />
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  form: {
    flex: 1,
    justifyContent: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  photoContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  photo: {
    width: 150,
    height: 150,
    marginBottom: 10,
  },
  loading: {
    marginTop: 10,
  },
});

export default RegisterScreen;
