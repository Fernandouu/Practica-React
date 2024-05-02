import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Alert } from 'react-native';
import Input from './src/componets/Input';
import Button from './src/componets/Button';
import { useState } from 'react';



export default function App() {
  const [numero1, setNumero1] = useState(0)
  const [numero2, setNumero2] = useState(0)
  const [resultado, setResultado] = useState(0)


  const sumar = () => {
    let suma = parseFloat(numero1) + parseFloat(numero2);
    setResultado(suma)
    Alert.alert("El resultado de la suma es: " + suma)
  }

  const restar = () => {
    let resta = parseFloat(numero1) - parseFloat(numero2);
    setResultado(resta)
    Alert.alert("El resultado de la resta es: " + resta)
  }

  const multiplicar = () => {
    let multiplicar = parseFloat(numero1) * parseFloat(numero2);
    setResultado(multiplicar)
    Alert.alert("El resultado de la multiplicacion es: " + multiplicar)
  }

  const division = () => {
    let division = parseFloat(numero1) / parseFloat(numero2);
    setResultado(division)
    Alert.alert("El resultado de la division es: " + division)
  }

  const restablecer = () => {
    setNumero1(0)
    setNumero2(0)
  }

  return (
    <View style={styles.container}>
      <Text> Calculadora </Text>
      <Input
        title_placeholder={'Ingrese numero 1: '}
        numero={numero1}
        setNumero={setNumero1}
      />
      <Input
        title_placeholder={'Ingrese numero 2: '}
        numero={numero2}
        setNumero={setNumero2}
      />

      <Button
        title_button={'Sumar'}
        action_button={sumar} />
      <Button
        title_button={'Restar'}
        action_button={restar} />
      <Button
        title_button={'Dividir'}
        action_button={division} />
      <Button
        title_button={'Multiplicar'}
        action_button={multiplicar} />


      <Button

        title_button={'Restablecer'}
        action_button={restablecer} />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  Input: {
    backgroundColor: 'lightgrey',
    width: 150,
    padding: 15,
    color: 'black',
    margin: 10
  }
});

