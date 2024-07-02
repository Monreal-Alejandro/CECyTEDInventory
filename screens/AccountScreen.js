// screens/AccountScreen.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function AccountScreen({ navigation }) {
  const handleLogout = () => {
    // Lógica para cerrar sesión
    console.log('Logout button pressed');
    navigation.navigate('Login');
  };

  const handleChangePassword = () => {
    // Lógica para cambiar la contraseña
    console.log('Change password button pressed');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="arrow-back" size={30} color="white" onPress={() => navigation.goBack()} />
        <Ionicons name="person-circle-outline" size={100} color="white" />
        <Text style={styles.title}>Cuenta</Text>
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.infoRow}>
          <Ionicons name="person-outline" size={24} color="white" style={styles.icon} />
          <Text style={styles.infoText}>Nombre completo: John Doe</Text>
        </View>
        <View style={styles.infoRow}>
          <Ionicons name="call-outline" size={24} color="white" style={styles.icon} />
          <Text style={styles.infoText}>Teléfono: 123-456-7890</Text>
        </View>
        <View style={styles.infoRow}>
          <Ionicons name="mail-outline" size={24} color="white" style={styles.icon} />
          <Text style={styles.infoText}>Correo electrónico: johndoe@example.com</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.changePasswordButton} onPress={handleChangePassword}>
        <Text style={styles.changePasswordText}>Cambiar contraseña</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Cerrar sesión</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#9acd32', // yellowgreen background
    padding: 20,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 30,
    color: '#FFFFFF', // white color for text
    marginTop: 10,
  },
  infoContainer: {
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  icon: {
    marginRight: 10,
  },
  infoText: {
    fontSize: 18,
    color: '#FFFFFF', // white color for text
  },
  changePasswordButton: {
    backgroundColor: '#00008b', // darkblue background
    borderRadius: 5,
    padding: 15,
    alignItems: 'center',
    marginBottom: 20,
  },
  changePasswordText: {
    color: '#FFFFFF', // white color for button text
    fontSize: 18,
  },
  logoutButton: {
    backgroundColor: '#00008b', // darkblue background
    borderRadius: 5,
    padding: 15,
    alignItems: 'center',
  },
  logoutText: {
    color: '#FFFFFF', // white color for button text
    fontSize: 18,
  },
});

