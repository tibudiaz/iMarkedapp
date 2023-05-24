import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { removeItemFromCart } from '../Constant/actions';
import { Ionicons } from '@expo/vector-icons';


const Carrito = () => {
  const cartItems = useSelector(state => state.cart);
  const [exchangeRate, setExchangeRate] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    getExchangeRate();
  }, []);

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

  const getTotalPrice = () => {
    let totalPrice = 0;
    cartItems.forEach(item => {
      totalPrice += item.price;
    });
    return totalPrice;
  };

  const getTotalPriceInPesos = () => {
    return (getTotalPrice() * exchangeRate).toFixed(0).slice(0, -2);
  };

  const handleRemoveItem = (index) => {
    dispatch(removeItemFromCart(index));
  };

  const handleFinalizarCompra = () => {
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Carrito de compras</Text>
      {cartItems.length === 0 ? (
        <Text>No hay productos en el carrito</Text>
      ) : (
        <>
          {cartItems.map((item, index) => (
            <View key={index} style={styles.itemContainer}>
            <Ionicons name="phone-portrait-outline" size={24} color="black" />
              <Text style={styles.itemName}>{item.name} - {item.price}</Text>
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => handleRemoveItem(index)}
              >
                <Text style={styles.removeButtonText}>Eliminar</Text>
              </TouchableOpacity>
            </View>
          ))}
          <Text style={styles.total}>Total: ${getTotalPrice()}</Text>
          <Text style={styles.total}>Total en Pesos: ${getTotalPriceInPesos()}</Text>
          <TouchableOpacity
            style={styles.finalizarButton}
            onPress={handleFinalizarCompra}
          >
            <Text style={styles.finalizarButtonText}>Finalizar compra</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  itemName: {
    fontSize: 16,
  },
  removeButton: {
    backgroundColor: 'red',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  removeButtonText: {
    color: 'white',
  },
  total: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  finalizarButton: {
    backgroundColor: 'green',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
  },
  finalizarButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Carrito;
