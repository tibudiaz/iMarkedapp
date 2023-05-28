import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const URL_API = 'https://imarketapp-84681-default-rtdb.firebaseio.com/';

const UserScreen = () => {
  const [userData, setUserData] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigation = useNavigation();
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const localId = await AsyncStorage.getItem('userId');
        if (localId) {
          const response = await fetch(`${URL_API}/users/${localId}.json`);
          const data = await response.json();
          setUserData(data);
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('userId');
    setIsLoggedIn(false);
  };
  const handleLogin = () => {
    navigation.navigate('Iniciar Sesion');
  };
  return (
    <View style={styles.container}>
      {isLoggedIn ? (
        <>
          <Text style={styles.label}>Nombre:</Text>
          <Text style={styles.value}>{userData?.name}</Text>

          <Text style={styles.label}>Apellido:</Text>
          <Text style={styles.value}>{userData?.lastName}</Text>

          <Text style={styles.label}>Edad:</Text>
          <Text style={styles.value}>{userData?.age}</Text>

          <Text style={styles.label}>Dni:</Text>
          <Text style={styles.value}>{userData?.dni}</Text>

          <Text style={styles.label}>Dirección:</Text>
          <Text style={styles.value}>{userData?.address}</Text>

          <Text style={styles.label}>Email:</Text>
          <Text style={styles.value}>{userData?.email}</Text>

          <Button title="Cerrar sesión" onPress={handleLogout} />
        </>
      ) : (
        <View>
        <Text style={styles.loginText}>Vuelve Pronto!</Text>
        <Button title="Iniciar sesión" onPress={handleLogin} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f2f2f2',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  value: {
    fontSize: 16,
    marginBottom: 16,
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 5,
  },
  loginText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#888',
  },
});

export default UserScreen;
