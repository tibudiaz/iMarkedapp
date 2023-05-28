import React from "react";
import {ScrollView, Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";


const HomeScreen = ({ navigation }) => {
  return (
    <ScrollView>
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('Catalogo Usados')}
      >
        <Image
          source={require('../assets/img/usados.jpg')}
          style={styles.image}
        />
        <Text style={styles.cardText}>Catálogo de Usados</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate( 'Catalogo Nuevos')}
      >
        <Image
          source={require('../assets/img/nuevos.jpg')}
          style={styles.image}
        />
        <Text style={styles.cardText}>Catálogo de Nuevos</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('Plan Canje')}
      >
        <Image
          source={require('../assets/img/canje.jpg')}
          style={styles.image}
        />
        <Text style={styles.cardText}>Plan de Canje</Text>
      </TouchableOpacity>
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  card: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 20,
    padding: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 2,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    elevation: 2,
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 10,
    borderRadius: 10,
  },
  cardText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default HomeScreen;
