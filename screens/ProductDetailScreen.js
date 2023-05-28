import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../Constant/actions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const ProductDetail = ({ route }) => {
  const { product } = route.params;
  const dispatch = useDispatch();
  const [exchangeRate, setExchangeRate] = useState(0);
  const [priceInPesos, setPriceInPesos] = useState(0);
  const [localId, setLocalId] = useState('');
  const isLoggedIn = useSelector(state => state.isLoggedIn);
  const navigation = useNavigation();
  
  const URL_API = 'https://imarketapp-84681-default-rtdb.firebaseio.com/';

  useEffect(() => {
    const fetchLocalId = async () => {
      const userId = await AsyncStorage.getItem('userId');
      setLocalId(userId);
    };

    fetchLocalId();
  }, []);

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    if (localId) {
      fetch(`${URL_API}carrito/${localId}.json`)
        .then(response => response.json())
        .then(data => {
          let updatedCart = {};
          if (data) {
            updatedCart = { ...data };
          }
          if (updatedCart[product.id]) {
            updatedCart[product.id].quantity += 1;
          } else {
            updatedCart[product.id] = { ...product, quantity: 1 };
          }
          return fetch(`${URL_API}carrito/${localId}.json`, {
            method: 'PUT',
            body: JSON.stringify(updatedCart),
          });
        })
        .then(response => response.json())
        .then(data => {
          console.log('Producto agregado al carrito de Firebase:', data);
        })
        .catch(error => {
          console.log('Error al agregar el producto al carrito de Firebase:', error);
        });
    }
  };

  const getExchangeRate = () => {
    fetch("https://www.dolarsi.com/api/api.php?type=valoresprincipales")
      .then((response) => response.json())
      .then((data) => {
        const blueDollar = data.find((x) => x.casa.nombre === "Dolar Blue");
        const exchangeRateValue = parseFloat(blueDollar.casa.venta.replace(",", ""));
        setExchangeRate(exchangeRateValue);
      })
      .catch((error) => {
        console.error("Error fetching exchange rate:", error);
      });
  };

  useEffect(() => {
    getExchangeRate();
  }, []);

  useEffect(() => {
    setPriceInPesos((product.price * (exchangeRate + 400)).toFixed(0).slice(0, -2));
  }, [product.price, exchangeRate]);

  const handleLogin = () => {
    navigation.navigate('Login');
  };


  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Image source={product.imageUrl} style={styles.image} />
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.price}>{`USD: ${product.price} / ARS: ${priceInPesos}`}</Text>
        {isLoggedIn ? (
          <TouchableOpacity onPress={handleAddToCart}>
            <Text style={styles.addToCartButton}>Agregar al carrito</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={handleLogin}>
            <Text style={styles.loginButton}>Iniciar sesión</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 10,
  },
  card: {
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 2,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    elevation: 3,
    backgroundColor: '#FFF',
    padding: 100,
  },
  image: {
    height: 260,
    marginBottom: 10,
    width: 190,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  price: {
    fontSize: 16,
    marginBottom: 10,
  },
  addToCartButton: {
    fontSize: 16,
    color: '#FFF',
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    textAlign: 'center',
  },
  loginButton: {
    fontSize: 16,
    color: '#FFF',
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    textAlign: 'center',
  },
});

export default ProductDetail;
