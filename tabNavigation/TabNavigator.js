import React, { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from '@expo/vector-icons';
import HomeScreen from '../screens/HomeScreen';
import CatalogoScreen from '../screens/CatalogoScreen';
import ProductDetail from '../screens/ProductDetailScreen';
import CatalogoNuevosScreen from '../screens/CatalogoNuevosScreen';
import PlanCanjeScreen from '../screens/PlanCanjeScreen';
import CarritoScreen from "../screens/CarritoScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import UserScreen from "../screens/UserScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const CatalogoTab = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Catalogo Usados"
      component={CatalogoScreen}
      options={{ headerTitle: 'Catálogo de Usados' }}
    />
    <Stack.Screen name="Producto" component={ProductDetail} />
  </Stack.Navigator>
);

const CatalogoNuevosTab = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Equipos Nuevos"
      component={CatalogoNuevosScreen}
      options={{ headerTitle: 'Catálogo de Nuevos' }}
    />
    <Stack.Screen name="Producto" component={ProductDetail} />
  </Stack.Navigator>
);

const AuthStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen
      name="Iniciar Sesion"
      component={LoginScreen}
      
    />
    <Stack.Screen
      name="Register"
      component={RegisterScreen}
    />
    <Stack.Screen 
    name="User"
    component={UserScreen}
    />
  </Stack.Navigator>
);

const HomeStack = () => {
  const navigation = useNavigation();

  const handleCatalogoUsados = () => {
    navigation.navigate('Catalogo Usados');
  };

  const handleCatalogoNuevos = () => {
    navigation.navigate('Catalogo Nuevos');
  };

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="iMarket Home"
        component={HomeScreen}
      />
      <Stack.Screen
        name="Catalogo Usados"
        component={CatalogoTab}
        options={{
          tabBarButton: () => null,
          tabBarVisible: false,
        }}
      />
      <Stack.Screen
        name="Catalogo Nuevos"
        component={CatalogoNuevosTab}
        options={{
          tabBarButton: () => null,
          tabBarVisible: false,
        }}
      />
      <Stack.Screen
        name="Plan Canje"
        component={PlanCanjeScreen}
        options={{
          tabBarButton: () => null,
          tabBarVisible: false,
        }}
      />
    </Stack.Navigator>
  );
};

const ShopNavigator = () => (
  <NavigationContainer>
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconComponent;

          if (route.name === "iMarket") {
            iconComponent = <Ionicons name="home" size={size} color={color} />;
          } else if (route.name === "Carrito") {
            iconComponent = <Ionicons name="cart" size={size} color={color} />;
          } else if (route.name === "Login") {
            iconComponent = <FontAwesome name="user" size={size} color={color} />;
          }

          return iconComponent;
        },
      })}
    >
      <Tab.Screen name="iMarket" component={HomeStack} />
      <Tab.Screen name="Carrito" component={CarritoScreen} />
      <Tab.Screen name="Login" component={AuthStack} />
    </Tab.Navigator>
  </NavigationContainer>
);

export default ShopNavigator;
