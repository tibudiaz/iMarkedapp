import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

export const AgregarProductoForm = ({ onAgregarProducto }) => {
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [imagen, setImagen] = useState('');

  const agregarProducto = () => {
    const producto = {
      name: nombre,
      price: parseFloat(precio),
      imageUrl: imagen ? { uri: imagen } : null,
    };
    onAgregarProducto(producto);
    setNombre('');
    setPrecio('');
    setImagen('');
  };

  return (
    <View style={styles.form}>
      <TextInput
        placeholder="Nombre"
        value={nombre}
        onChangeText={setNombre}
        style={styles.input}
      />
      <TextInput
        placeholder="Precio"
        value={precio}
        onChangeText={setPrecio}
        style={styles.input}
        keyboardType="numeric"
      />
      <TextInput
        placeholder="URL de la imagen (opcional)"
        value={imagen}
        onChangeText={setImagen}
        style={styles.input}
      />
      <Button title="Agregar" onPress={agregarProducto} />
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    margin: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});
