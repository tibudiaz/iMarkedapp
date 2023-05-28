import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

const URL_API = 'https://imarketapp-84681-default-rtdb.firebaseio.com/';

const CarritoScreen = () => {
  const isLoggedIn = useSelector(state => state.isLoggedIn);
  const [productos, setProductos] = useState([]);
  const [totalUSD, setTotalUSD] = useState(0);
  const [totalARS, setTotalARS] = useState(0);
  const [exchangeRate, setExchangeRate] = useState(0);
  const navigation = useNavigation();

  const fetchCarrito = useCallback(async () => {
    try {
      if (isLoggedIn) {
        const localId = await AsyncStorage.getItem('userId');
        if (localId) {
          const response = await fetch(`${URL_API}/carrito/${localId}.json`);
          const data = await response.json();
          if (data) {
            const carritoProductos = Object.values(data).filter(Boolean);
            setProductos(carritoProductos);
            calcularTotales(carritoProductos);
          } else {
            setProductos([]);
            setTotalUSD(0);
            setTotalARS(0);
          }
        }
      }
    } catch (error) {
      console.log('Error al obtener el carrito:', error);
    }
  }, [isLoggedIn]);

  const calcularTotales = useCallback((carritoProductos) => {
    const nuevoTotalUSD = carritoProductos.reduce((acc, producto) => {
      return acc + producto.price * producto.quantity;
    }, 0);
    setTotalUSD(nuevoTotalUSD);

    const nuevoTotalARS = (nuevoTotalUSD * (exchangeRate + 400)).toFixed(0).slice(0, -2);
    setTotalARS(nuevoTotalARS);
  }, [exchangeRate]);

  const handleDeleteProducto = async (id) => {
    try {
      const localId = await AsyncStorage.getItem('userId');
      if (localId) {
        const response = await fetch(`${URL_API}/carrito/${localId}/${id}.json`, {
          method: 'DELETE',
        });
        if (response.ok) {
          const carritoProductos = productos.filter(producto => producto.id !== id);
          setProductos(carritoProductos);
          calcularTotales(carritoProductos);
        } else {
          console.log('Error al eliminar el producto del carrito.');
        }
      }
    } catch (error) {
      console.log('Error al eliminar el producto del carrito:', error);
    }
  };

  const handleAgregarProducto = async (id) => {
    try {
      const localId = await AsyncStorage.getItem('userId');
      if (localId) {
        const response = await fetch(`${URL_API}/carrito/${localId}/${id}/quantity`, {
          method: 'POST',
        });
        if (response.ok) {
          const carritoProductos = productos.map(producto => {
            if (producto.id === id) {
              producto.quantity += 1;
            }
            return producto;
          });
          setProductos(carritoProductos);
          calcularTotales(carritoProductos);
        } else {
          console.log('Error al incrementar la cantidad del producto en el carrito.');
        }
      }
    } catch (error) {
      console.log('Error al incrementar la cantidad del producto:', error);
    }
  };

  const handleReducirProducto = async (id) => {
    try {
      const localId = await AsyncStorage.getItem('userId');
      if (localId) {
        const response = await fetch(`${URL_API}/carrito/${localId}/${id}/remove`, {
          method: 'POST',
        });
        if (response.ok) {
          const carritoProductos = productos.map(producto => {
            if (producto.id === id && producto.quantity > 0) {
              producto.quantity -= 1;
            }
            return producto;
          });
          setProductos(carritoProductos);
          calcularTotales(carritoProductos);
        } else {
          console.log('Error al reducir la cantidad del producto en el carrito.');
        }
      }
    } catch (error) {
      console.log('Error al reducir la cantidad del producto:', error);
    }
  };

  const handleFinalizarCompra = () => {
    // Lógica para finalizar la compra
  };

  const handleLimpiarCarrito = async () => {
    try {
      const localId = await AsyncStorage.getItem('userId');
      if (localId) {
        const response = await fetch(`${URL_API}/carrito/${localId}.json`, {
          method: 'DELETE',
        });
        if (response.ok) {
          setProductos([]);
          setTotalUSD(0);
          setTotalARS(0);
        } else {
          console.log('Error al limpiar el carrito.');
        }
      }
    } catch (error) {
      console.log('Error al limpiar el carrito:', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      if (!isLoggedIn) {
      } else {
        fetchCarrito();
      }
    }, [fetchCarrito, isLoggedIn, navigation]),
  );

  const renderProducto = ({ item }) => (
    <View style={styles.productoContainer}>
      <Text style={styles.productoNombre}>{item.name}</Text>
      <View style={styles.productoDetalle}>
        <Text style={styles.productoPrecio}>{`Precio: $${item.price} USD`}</Text>
        <View style={styles.productoCantidadContainer}>
          <Text style={styles.productoCantidad}>{`Cantidad: ${item.quantity}`}</Text>
          <TouchableOpacity onPress={() => handleAgregarProducto(item.id)}>
            <Text style={styles.cantidadButton}>+</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleReducirProducto(item.id)}>
            <Text style={styles.cantidadButton}>-</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => handleDeleteProducto(item.id)}>
          <Text style={styles.eliminarProducto}>Eliminar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

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

  const handleLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{`Cantidad de productos: ${productos.length}`}</Text>
      {isLoggedIn ? (
        <View style={styles.listaContainer}>
          {productos.length > 0 ? (
            <FlatList
              data={productos}
              renderItem={renderProducto}
              keyExtractor={item => item.id.toString()}
              style={styles.listaProductos}
            />
          ) : (
            <Text style={styles.emptyText}>No hay productos en el carrito.</Text>
          )}
        </View>
      ) : (
        <Text style={styles.loginText} onPress={handleLogin}>
          Inicia sesión para ver el carrito
        </Text>
      )}
      {isLoggedIn && productos.length > 0 && (
        <View style={styles.totalContainer}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total USD:</Text>
            <Text style={styles.totalValue}>{`$${totalUSD}`}</Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total ARS:</Text>
            <Text style={styles.totalValue}>{`$${totalARS}`}</Text>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={handleLimpiarCarrito}>
              <Text style={styles.limpiarCarrito}>Limpiar Carrito</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.finalizarButton} onPress={handleFinalizarCompra}>
              <Text style={styles.finalizarButtonText}>Finalizar Compra</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
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
  listaContainer: {
    flex: 1,
    marginBottom: 16,
  },
  listaProductos: {
    marginBottom: 8,
  },
  productoContainer: {
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 8,
  },
  productoNombre: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  productoDetalle: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  productoPrecio: {
    fontSize: 16,
  },
  productoCantidadContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  productoCantidad: {
    fontSize: 16,
    marginRight: 8,
  },
  cantidadButton: {
    fontSize: 18,
    color: 'blue',
    paddingHorizontal: 8,
  },
  eliminarProducto: {
    color: 'red',
    fontSize: 16,
    fontWeight: 'bold',
  },
  emptyText: {
    fontSize: 16,
    fontStyle: 'italic',
  },
  totalContainer: {
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingTop: 8,
  },
  totalRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  loginText: {
    color: 'blue',
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 8,
  },
  totalValue: {
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  limpiarCarrito: {
    backgroundColor: 'red',
    color: 'white',
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
  },
  finalizarButton: {
    backgroundColor: 'blue',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  finalizarButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default CarritoScreen;
