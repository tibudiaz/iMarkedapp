import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from '../screens/HomeScreen';
import CatalogoScreen from '../screens/CatalogoScreen';
import ProductDetail from '../screens/ProductDetailScreen';
import CatalogoNuevosScreen from '../screens/CatalogoNuevosScreen';
import PlanCanjeScreen from '../screens/PlanCanjeScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

    const CatalogoTab = () => (
    <Stack.Navigator>
        <Stack.Screen name="Catalogo Usados" component={CatalogoScreen} />
        <Stack.Screen name="Producto" component={ProductDetail} />
    </Stack.Navigator>
    );
    const CatalogoNuevosTab = () => (
        <Stack.Navigator>
        <Stack.Screen name="Equipos Nuevos" component={CatalogoNuevosScreen} />
        <Stack.Screen name="Producto" component={ProductDetail} />
        </Stack.Navigator>
    );
    const ShopNavigator = () => (
    <NavigationContainer>
        <Tab.Navigator>
        <Tab.Screen name="iMarket Home" component={HomeScreen} />
        <Tab.Screen name="Catalogo" component={CatalogoTab} />
        <Tab.Screen name="Catalogo Nuevos" component={CatalogoNuevosTab} />
        <Tab.Screen name="Plan Canje" component={PlanCanjeScreen} />
        </Tab.Navigator>
    </NavigationContainer>
    );

export default ShopNavigator;
