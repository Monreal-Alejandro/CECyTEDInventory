// screens/AccountScreen.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function AccountScreen({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleLogout = () => {
    console.log('Logout button pressed');
    navigation.navigate('Login');
  };

  const handleChangePassword = () => {
    console.log('Change password button pressed');
    setModalVisible(true);
  };

  const handleSavePassword = () => {
    if (newPassword === confirmPassword) {
      console.log('Password changed successfully');
      setModalVisible(false);
    } else {
      console.log('Passwords do not match');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={30} color="white" />
      </TouchableOpacity>
      <View style={styles.header}>
        <Ionicons name="person-circle-outline" size={100} color="white" />
        <Text style={styles.title}>Cuenta</Text>
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.infoRow}>
          <Ionicons name="person-outline" size={24} color="darkblue" style={styles.icon} />
          <Text style={styles.infoText}>Nombre completo: John Doe</Text>
        </View>
        <View style={styles.infoRow}>
          <Ionicons name="call-outline" size={24} color="darkblue" style={styles.icon} />
          <Text style={styles.infoText}>Teléfono: 123-456-7890</Text>
        </View>
        <View style={styles.infoRow}>
          <Ionicons name="mail-outline" size={24} color="darkblue" style={styles.icon} />
          <Text style={styles.infoText}>Correo electrónico: johndoe@example.com</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.changePasswordButton} onPress={handleChangePassword}>
        <Text style={styles.changePasswordText}>Cambiar contraseña</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Cerrar sesión</Text>
      </TouchableOpacity>
      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Cambiar contraseña</Text>
            <TextInput
              style={styles.input}
              placeholder="Contraseña actual"
              placeholderTextColor="#999"
              secureTextEntry
              value={currentPassword}
              onChangeText={setCurrentPassword}
            />
            <TextInput
              style={styles.input}
              placeholder="Nueva contraseña"
              placeholderTextColor="#999"
              secureTextEntry
              value={newPassword}
              onChangeText={setNewPassword}
            />
            <TextInput
              style={styles.input}
              placeholder="Confirmar nueva contraseña"
              placeholderTextColor="#999"
              secureTextEntry
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.modalButton} onPress={handleSavePassword}>
                <Text style={styles.modalButtonText}>Guardar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.modalButtonText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#9acd32', // yellowgreen background
    padding: 20,
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 20,
    marginTop: 40, // Adjust this value to move the button down
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 30,
    color: '#FFFFFF', // white color for text
    marginTop: 10,
  },
  infoContainer: {
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff', // white background for info rows
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  icon: {
    marginRight: 10,
  },
  infoText: {
    fontSize: 18,
    color: '#000000', // black color for text
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#00008b', // darkblue border
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingLeft: 10,
    color: '#000', // black text
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    backgroundColor: '#00008b', // darkblue background
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    width: '45%',
  },
  modalButtonText: {
    color: '#FFFFFF', // white color for button text
    fontSize: 16,
  },
});
