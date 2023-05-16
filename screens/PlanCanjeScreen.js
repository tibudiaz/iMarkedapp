import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';

const PlanCanjeScreen = () => {
  const [modelo, setModelo] = useState('');
  const [porcentajeBateria, setPorcentajeBateria] = useState('');
  const [precio, setPrecio] = useState(0);
  const [exchangeRate, setExchangeRate] = useState(0);
  const [memoria, setMemoria] = useState('');

  useEffect(() => {
    getExchangeRate();
  }, []);

  const getExchangeRate = () => {
    fetch("https://www.dolarsi.com/api/api.php?type=valoresprincipales")
      .then((response) => response.json())
      .then((data) => {
        const blueDollar = data.find((x) => x.casa.nombre === "Dolar Blue");
        const exchangeRateValue = parseFloat(blueDollar.casa.venta.replace(",", ""));
        setExchangeRate(exchangeRateValue);
      })
      .catch((error) => {
        console.error("Error fetching exchange rate:", error);
      });
  };

  const modelosCotizacion = [
    { id: '1', name: 'iPhone 8', basePrice: 180 },
    { id: '2', name: 'iPhone 8 Plus', basePrice: 280 },
    { id: '4', name: 'iPhone XR', basePrice: 290 },
    { id: '7', name: 'iPhone 11', basePrice: 380 },
    { id: '8', name: 'iPhone 11 Pro', basePrice: 440 },
    { id: '9', name: 'iPhone 11 Pro Max', basePrice: 500 },
    { id: '12', name: 'iPhone 12', basePrice: 500 },
    { id: '13', name: 'iPhone 12 Pro', basePrice: 640 },
    { id: '14', name: 'iPhone 12 Pro Max', basePrice: 710 },
    { id: '16', name: 'iPhone 13', basePrice: 700 },
    { id: '17', name: 'iPhone 13 Pro', basePrice: 800 },
    { id: '18', name: 'iPhone 13 Pro Max', basePrice: 900 },
  ];

  const calcularPrecio = () => {
    let nuevoPrecio = 0;

    const modeloSeleccionado = modelosCotizacion.find((item) => item.name === modelo);
    if (modeloSeleccionado) {
      nuevoPrecio = modeloSeleccionado.basePrice;

      const bateria = parseInt(porcentajeBateria);
      if (bateria >= 90) {
        nuevoPrecio -= 0;
      } else if (bateria >= 80) {
        nuevoPrecio -= 25;
      } else if (bateria < 80) {
        nuevoPrecio -= 50;
      }

      switch (memoria) {
        case '64GB':
          nuevoPrecio += 0;
          break;
        case '128GB':
          nuevoPrecio += 25;
          break;
        case '256GB':
          nuevoPrecio += 50;
          break;
        default:
          break;
      }
    }

    setPrecio(nuevoPrecio);
  };

  const precioEnPesos = (precio * exchangeRate).toFixed(0).slice(0, -2);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cotizador de iPhones</Text>
      <View style={styles.pickerContainer}>
        <ModalDropdown
          options={modelosCotizacion.map((modelo) => modelo.name)}
          defaultValue="Selecciona un modelo"
          onSelect={(index, value) => setModelo(value)}
          style={styles.picker}
          textStyle={styles.pickerText}
          dropdownStyle={styles.dropdown}
          dropdownTextStyle={styles.dropdownText}
        />
      </View>
      <View style={styles.pickerContainer}>
        <ModalDropdown
          options={['64GB', '128GB', '256GB']}
          defaultValue="Selecciona la memoria"
          onSelect={(index, value) => setMemoria(value)}
          style={styles.picker}
          textStyle={styles.pickerText}
          dropdownStyle={styles.dropdown}
          dropdownTextStyle={styles.dropdownText}
        />
      </View>
            <TextInput style={styles.input}
            placeholder="Porcentaje de Batería"
            value={porcentajeBateria}
            onChangeText={setPorcentajeBateria}
            />
            <Button title="Calcular Precio" onPress={calcularPrecio} />
            <Text style={styles.result}>
                Precio en USD: ${precio}
            </Text>
            <Text style={styles.result}>
                Precio en ARS: ${precioEnPesos}
            </Text>
    </View>
);
};

    const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
    },
    pickerContainer: {
        width: "100%",
        marginBottom: 10,
    },
    picker: {
        borderWidth: 1,
        borderColor: "gray",
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 15,
    },
    pickerText: {
        fontSize: 16,
    },
    dropdown: {
        marginTop: 1,
        borderWidth: 1,
        borderColor: "gray",
        borderRadius: 5,
    },
    dropdownText: {
        fontSize: 16,
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
    input: {
        width: "100%",
        height: 40,
        borderWidth: 1,
        borderColor: "gray",
        borderRadius: 5,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    button: {
        width: "100%",
        height: 40,
        backgroundColor: "#007AFF",
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 10,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    result: {
        fontSize: 18,
        fontWeight: "bold",
        marginTop: 20,
    },
    });

export default PlanCanjeScreen;