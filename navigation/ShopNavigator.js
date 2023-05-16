import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from '../screens/HomeScreen';
import CatalogoScreen from '../screens/CatalogoScreen';
import ProductDetail from '../screens/ProductDetailScreen';
import CatalogoNuevosScreen from '../screens/CatalogoNuevosScreen';
import PlanCanjeScreen from '../screens/PlanCanjeScreen';

const Stack = createNativeStackNavigator();

const ShopNavigator = () => (
    <NavigationContainer>
        <Stack.Navigator initialRouteName="iMarket Home">
            <Stack.Screen name="iMarket Home" component={HomeScreen} />
            <Stack.Screen name="Catalogo Usados" component={CatalogoScreen} />
            <Stack.Screen name="Catalogo Nuevos" component={CatalogoNuevosScreen} />
            <Stack.Screen name="Plan Canje" component={PlanCanjeScreen} />
            <Stack.Screen name="Producto" component={ProductDetail} />
        </Stack.Navigator>
    </NavigationContainer>
);

export default ShopNavigator;