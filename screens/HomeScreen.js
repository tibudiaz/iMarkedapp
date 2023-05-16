import React from "react";
import { Text, Button, View } from "react-native";
import { TopBar } from "../components/TopBar";

export default function HomeScreen ({ navigation }) {
    return (
        <View>
            <TopBar />
            <Text>Catalogo</Text>
            <Button title="Ir al Catalogo" onPress={ () => {navigation.navigate('Catalogo')}} />
        </View>
    )
}