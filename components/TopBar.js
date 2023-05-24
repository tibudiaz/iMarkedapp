import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { AntDesign, Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export const TopBar = () => {
  const navigation = useNavigation();

  const handleTabNavigation = () => {
    navigation.navigate('TabNavigator'); 
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.iconContainer}>
        <AntDesign name="menuunfold" size={24} color="white" />
      </TouchableOpacity>
      <Text style={styles.title}>iMarket</Text>
      <TouchableOpacity style={styles.iconContainer} onPress={handleTabNavigation}>
        <Feather name="shopping-cart" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    height: 90,
    paddingTop: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  title: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  iconContainer: {
    padding: 5,
  },
});
