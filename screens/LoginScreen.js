// screens/LoginScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import axios from 'axios';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('https://estadiastsu-production.up.railway.app/usuarios/login', {
        email,
        password,
      });
      console.log(response.data);
      // Redirigir al usuario a la pantalla de inicio
      navigation.navigate('AssignmentsScreen');
    } catch (error) {
      console.error(error);
      alert('Correo electrónico o contraseña incorrectos');
    }
  }

  const handleRegister = () => {
    navigation.navigate('Register');
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/logito.png')} style={styles.logo} />
      <Text style={styles.subtitle}>Aplicación de inventario</Text>
      <Text style={styles.title}>Inicio de sesión</Text>
      <Text style={styles.instruction}>Por favor, inicia sesión con tu cuenta existente</Text>
      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        placeholderTextColor="#FFFFFF"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        placeholderTextColor="#FFFFFF"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Iniciar sesión</Text>
      </TouchableOpacity>
      <Text style={styles.registerText}>
        ¿No tienes una cuenta?{' '}
        <Text style={styles.registerLink} onPress={handleRegister}>
          Regístrate
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9acd32', // yellowgreen background
    padding: 20,
  },
  logo: {
    width: 180,
    height: 180,
    marginBottom: 20, // Reducción de margen inferior
  },
  subtitle: {
    fontSize: 20,
    color: '#FFFFFF', // white color for text
    marginBottom: 20,
  },
  title: {
    fontSize: 30,
    color: '#FFFFFF', // white color for text
    marginBottom: 20, // Reducción de margen inferior
  },
  instruction: {
    fontSize: 16,
    color: '#FFFFFF', // white color for text
    marginBottom: 40,
  },
  input: {
    width: '80%',
    height: 50,
    borderColor: '#FFFFFF', // white border
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingLeft: 10,
    color: '#FFFFFF', // white color for text input
  },
  button: {
    width: '80%',
    height: 50,
    backgroundColor: '#00008b', // darkblue background
    borderColor: '#00008b', // darkblue border color
    borderWidth: 2,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#FFFFFF', // white color for button text
    fontSize: 18,
  },
  registerText: {
    fontSize: 16,
    color: '#FFFFFF', // white color for text
    textAlign: 'center',
    marginTop: 20, // Añadir un margen superior
  },
  registerLink: {
    color: '#00008b', // darkblue color for link
    fontWeight: 'bold',
  },
});




