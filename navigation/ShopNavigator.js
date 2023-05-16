import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from '../screens/HomeScreen';
import CatalogoScreen from '../screens/CatalogoScreen';
import ProductDetail from '../screens/ProductDetailScreen';

const Stack = createNativeStackNavigator();

const ShopNavigator = () => (
    <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Catalogo" component={CatalogoScreen} />
            <Stack.Screen name="Producto" component={ProductDetail} />
        </Stack.Navigator>
    </NavigationContainer>
);

export default ShopNavigator;