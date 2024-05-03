import * as React from 'react';
import { View, Text, TouchableOpacity, TextInput, FlatList, StyleSheet, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useState } from 'react';

// Definición de las funciones de pantalla
function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', backgroundColor: '#196F3D' }}>
      <Text style={{ fontSize: 40, borderRadius: 10, marginTop: 50 }}>Practicas de REACT</Text>
    </View>
  );
}

function ToDoList() {
  // Estados para las tareas y la tarea actual
  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState('');

  // Función para agregar una tarea
  const addTask = () => {
    if (taskText.trim() !== '') {
      setTasks([...tasks, taskText]);
      setTaskText('');
    }
  };

  // Función para eliminar una tarea
  const deleteTask = (index) => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
  };

  // Renderizar cada elemento de la lista de tareas
  const renderItem = ({ item, index }) => (
    <TouchableOpacity onPress={() => deleteTask(index)} style={styles.taskItem}>
      <Text>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, alignItems: 'center', backgroundColor: '#196F3D' }}>
      <Text style={{ fontSize: 40, borderRadius: 10, marginTop: 50 }}>ToDoList App</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 20 }}>
        <TextInput
          style={styles.input}
          placeholder="Enter Task"
          value={taskText}
          onChangeText={(text) => setTaskText(text)}
        />
        <TouchableOpacity style={styles.addButton} onPress={addTask}>
          <Text style={{ color: 'white' }}>Add Task</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={tasks}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        style={{ width: '100%' }}
      />
    </View>
  );
}

function CalculadoraScreen() {
  // Definición de los estados para los números y el resultado
  const [numero1, setNumero1] = useState('0');
  const [numero2, setNumero2] = useState('0');
  const [resultado, setResultado] = useState('0');

  // Funciones para realizar las operaciones
  const sumar = () => {
    let suma = parseFloat(numero1) + parseFloat(numero2);
    setResultado(suma.toString());
  };

  const restar = () => {
    let resta = parseFloat(numero1) - parseFloat(numero2);
    setResultado(resta.toString());
  };

  const multiplicar = () => {
    let multiplicar = parseFloat(numero1) * parseFloat(numero2);
    setResultado(multiplicar.toString());
  };

  const division = () => {
    if (parseFloat(numero2) !== 0) {
      let division = parseFloat(numero1) / parseFloat(numero2);
      setResultado(division.toString());
    } else {
      Alert.alert('Error', 'No se puede dividir por cero');
    }
  };

  const restablecer = () => {
    setNumero1('0');
    setNumero2('0');
    setResultado('0');
  };

  // Estructura del componente de la calculadora
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 40 }}>Calculadora</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        onChangeText={(text) => setNumero1(text)}
        value={numero1}
      />
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        onChangeText={(text) => setNumero2(text)}
        value={numero2}
      />
      <View style={styles.row}>
        <TouchableOpacity style={styles.button} onPress={sumar}>
          <Text style={styles.buttonText}>Sumar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={restar}>
          <Text style={styles.buttonText}>Restar</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <TouchableOpacity style={styles.button} onPress={multiplicar}>
          <Text style={styles.buttonText}>Multiplicar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={division}>
          <Text style={styles.buttonText}>Dividir</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.button} onPress={restablecer}>
        <Text style={styles.buttonText}>Restablecer</Text>
      </TouchableOpacity>
      <Text style={{ fontSize: 30, marginTop: 20 }}>Resultado: {resultado}</Text>
    </View>
  );
}

function MyTabBar({ state, descriptors, navigation }) {
  return (
    <View style={{ flexDirection: 'row', backgroundColor: '#0E6655' }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ flex: 1 }}
            key={route.key}
          >
            <Text style={{ color: isFocused ? '#0B5345' : '#222', fontSize: 20 }}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

// Definición del componente App
export default function App() {
  const Tab = createBottomTabNavigator(); 

  return (
    <NavigationContainer>
      <Tab.Navigator tabBar={(props) => <MyTabBar {...props} />}>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Calculadora" component={CalculadoraScreen} />
        <Tab.Screen name="ToDoList" component={ToDoList} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

// Estilos para el componente
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#196F3D',
  },
  input: {
    width: 200,
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    backgroundColor: 'white',
  },
  button: {
    backgroundColor: '#0B5345',
    padding: 10,
    margin: 5,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
  },
  row: {
    flexDirection: 'row',
    marginTop: 10,
  },
  taskItem: {
    backgroundColor: '#F4B400',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  addButton: {
    backgroundColor: '#0B5345',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginLeft: 10,
  },
});
