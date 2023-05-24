import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from '@expo/vector-icons';
import HomeScreen from '../screens/HomeScreen';
import CatalogoScreen from '../screens/CatalogoScreen';
import ProductDetail from '../screens/ProductDetailScreen';
import CatalogoNuevosScreen from '../screens/CatalogoNuevosScreen';
import PlanCanjeScreen from '../screens/PlanCanjeScreen';
import CarritoScreen from "../screens/CarritoScreen";

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
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconComponent;
  
            if (route.name === "iMarket Home") {
              iconComponent = <Ionicons name="home" size={size} color={color} />;
            } else if (route.name === "Usados") {
              iconComponent = <Ionicons name="phone-portrait" size={size} color={color} />;
            } else if (route.name === "Nuevos") {
              iconComponent = <Ionicons name="phone-portrait-outline" size={size} color={color} />;
            } else if (route.name === "Plan Canje") {
              iconComponent = <FontAwesome name="handshake-o" size={size} color={color} />;
            } else if (route.name === "Carrito") {
              iconComponent = <Ionicons name="cart" size={size} color={color} />;
            }
  
            return iconComponent;
          },
        })}
      >
        <Tab.Screen name="iMarket Home" component={HomeScreen} />
        <Tab.Screen name="Usados" component={CatalogoTab} />
        <Tab.Screen name="Nuevos" component={CatalogoNuevosTab} />
        <Tab.Screen name="Plan Canje" component={PlanCanjeScreen} />
        <Tab.Screen name="Carrito" component={CarritoScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );

export default ShopNavigator;
