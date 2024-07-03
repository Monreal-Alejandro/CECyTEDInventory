// screens/RegisterScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import axios from 'axios';

export default function RegisterScreen({ navigation }) {
  const [nombre, setnombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/usuarios/register', {
        nombre,
        email,
        password,
      });
      console.log(response.data );
      // Redirigir al usuario a la pantalla de inicio
      navigation.navigate('AssignmentsScreen');
    } catch (error) {
      console.error(error);
      alert('Error al crear la cuenta');
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/register.png')} style={styles.logo} />
      <Text style={styles.subtitle}>Aplicación de inventario</Text>
      <Text style={styles.title}>Registro</Text>
      <Text style={styles.instruction}>Por favor, llena los campos para crear una nueva cuenta</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre completo"
        placeholderTextColor="#FFFFFF"
        value={nombre}
        onChangeText={setnombre}
      />
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
      <TextInput
        style={styles.input}
        placeholder="Confirmar contraseña"
        placeholderTextColor="#FFFFFF"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Registrarse</Text>
      </TouchableOpacity>
      <Text style={styles.registerText}>
        ¿Ya tienes una cuenta?{' '}
        <Text style={styles.registerLink} onPress={() => navigation.navigate('Login')}>
          Inicia sesión
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
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#FFFFFF', // white color for text
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    color: '#FFFFFF', // white color for text
    marginBottom: 10,
  },
  instruction: {
    fontSize: 16,
    color: '#FFFFFF', // white color for text
    marginBottom: 20,
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

