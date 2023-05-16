import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const ProductDetail = ({ route }) => {
  const { product } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Image source={product.imageUrl} style={styles.image} />
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.price}>{product.price}</Text>
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
});

export default ProductDetail;

