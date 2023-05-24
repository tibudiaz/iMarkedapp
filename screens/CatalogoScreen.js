import React, { useState } from 'react';
import { ScrollView, View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { AgregarProductoForm } from '../components/agregarProducto';

const catalogoData = [
  { id: 1, name: 'iPhone 11 USADO', price: 460, imageUrl: require('../assets/img/11.jpg') },
  { id: 2, name: 'iPhone 12 USADO', price: 560, imageUrl: require('../assets/img/12.png') },
  { id: 3, name: 'iPhone 13 USADO', price: 780, imageUrl: require('../assets/img/13p.jpg') },
];

export default function CatalogoScreen ({ navigation }){
  const [productos, setProductos] = useState(catalogoData);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  const eliminarProducto = (id) => {
    setProductos(productos.filter((producto) => producto.id !== id));
  };

  const agregarProducto = (producto) => {
    const id = productos.length + 1;
    setProductos([...productos, { ...producto, id }]);
    setMostrarFormulario(false);
  };

  const renderProducto = (item) => (
    <TouchableOpacity
      key={item.id}
      style={styles.card}
      onPress={() => navigation.navigate('Producto', { product: item })}
    >
      <View style={styles.imageContainer}>
        {item.imageUrl && <Image source={item.imageUrl} style={styles.image} />}
      </View>
      <Text>{item.name}</Text>
      <Text>{item.price}</Text>
      <TouchableOpacity onPress={() => eliminarProducto(item.id)}>
        <Text style={styles.eliminar}>Eliminar</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const renderAgregarProductoForm = () => {
    if (mostrarFormulario) {
      return <AgregarProductoForm onAgregarProducto={agregarProducto} />;
    } else {
      return (
        <TouchableOpacity
          style={styles.agregarButton}
          onPress={() => setMostrarFormulario(true)}
        >
          <Text style={styles.agregarButtonText}>Agregar Nuevo Producto</Text>
        </TouchableOpacity>
      );
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {productos.map((item) => renderProducto(item))}
        {renderAgregarProductoForm()}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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
    elevation: 2,
    backgroundColor: '#fff',
    padding: 10,
    margin: 10,
  },
  imageContainer: {
    alignItems: 'center',
  },
  image: {
    height: 260,
    marginBottom: 10,
    width: 190,
  },
  eliminar: {
    color: 'red',
    marginTop: 5,
  },
  agregarButton: {
    backgroundColor: '#007AFF',
    borderRadius: 5,
    padding: 10,
    margin: 10,
  },
  agregarButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
});


