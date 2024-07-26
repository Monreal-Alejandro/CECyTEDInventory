import React, { useState, useEffect } from 'react';
import { Picker } from '@react-native-picker/picker';
import {
  View, Text, Image, TextInput, TouchableOpacity, StyleSheet, ScrollView,
  Modal, Alert, FlatList
} from 'react-native';
import { Ionicons, FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';
import AutocompleteSearch from '../components/SearchComponentEq';

export default function EquipmentScreen({ navigation }) {
  const API_URL = 'https://estadiastsu-production.up.railway.app/equipos';
  const [modalVisible, setModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [newEquipment, setNewEquipment] = useState({
    nombre: '', descripcion: '', fecha_adquisision: '', estado_equipo_id: ''
  });
  const [currentEquipment, setCurrentEquipment] = useState({ nombre: '', descripcion: '', fecha_adquisision: '', estado_equipo_id: '' });
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [estados, setEstados] = useState([]);

  useEffect(() => {
    fetchEquipment();
    fetchEstate();
  }, []);

  const fetchEquipment = async () => {
    try {
      const response = await axios.get(API_URL);
      setData(response.data);
      setLoading(false);
    } catch (error) {
      Alert.alert('Error', 'Ocurrió un error al cargar el equipo');
      setLoading(false);
      console.error(error);
    }
  };

  const fetchEstate = async () => {
    try {
      const response = await axios.get('https://estadiastsu-production.up.railway.app/estados');
      setEstados(response.data);
      setLoading(false);
    } catch (error) {
      Alert.alert('Error', 'Ocurrió un error al cargar el estado del equipo');
      setLoading(false);
      console.error(error);
    }
  };

  const handleSelectSuggestion = async (suggestion) => {
    try {
      const response = await axios.get(`https://estadiastsu-production.up.railway.app/busquedas/equipos?busqueda=${suggestion}`);
      setData(response.data);
    } catch (error) {
      console.log('Error en la búsqueda: ', error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.cardText}>
        <Text style={{ fontWeight: 'bold' }}>No. de equipo: </Text>
        {item.id}
      </Text>
      <Text style={styles.cardText}>
        <Text style={{ fontWeight: 'bold' }}>Nombre: </Text>
        {item.nombre}
      </Text>
      <Text style={styles.cardText}>
        <Text style={{ fontWeight: 'bold' }}>descripcion: </Text>
        {item.descripcion}
      </Text>
      <Text style={styles.cardText}>
        <Text style={{ fontWeight: 'bold' }}>Fecha de adquisision: </Text>
        {item.fecha_adquisision}
      </Text>
      <Text style={styles.cardText}>
        <Text style={{ fontWeight: 'bold' }}>Estado del equipo: </Text>
        {item.estado_nombre}
      </Text>
      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => {
            setCurrentEquipment(item);
            setEditModalVisible(true);
          }}
        >
          <Text style={styles.actionText}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => handleDeleteEquipment(item.id)}
        >
          <Text style={styles.actionText}>Borrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const handleAddEquipment = async () => {
    try {
      const response = await axios.post(API_URL, newEquipment);
      fetchEquipment();
      setModalVisible(false);
      setNewEquipment({
        nombre: '', descripcion: '', fecha_adquisision: '', estado_equipo_id: ''
      });
      Alert.alert('Éxito', `Equipo agregado correctamente`);
    } catch (error) {
      Alert.alert('Error', 'Ocurrió un error al agregar el equipo');
      console.error(error);
    }
  };

  const handleDeleteEquipment = async (id) => {
    Alert.alert(
      'Confirmar Eliminación',
      '¿Estás seguro de que deseas eliminar este equipo?',
      [
        {
          text: 'Cancelar',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Eliminar',
          onPress: async () => {
            try {
              const idDel = id;
              await axios.delete(`${API_URL}/${id}`);
              Alert.alert('Éxito', `Equipo eliminado correctamente con el número de equipo: ${idDel}`);
              fetchEquipment();
            } catch (error) {
              Alert.alert('Error', 'Ocurrió un error al borrar el equipo');
              console.error(error);
            }
          },
          style: 'destructive',
        },
      ],
      { cancelable: true }
    );
  };

  const handleEditEquipment = async () => {
    try {
      const { id } = currentEquipment;
      const response = await axios.put(`${API_URL}/${currentEquipment.id}`, currentEquipment);
      fetchEquipment();
      setEditModalVisible(false);
      setCurrentEquipment(null);
      Alert.alert('Éxito', `Equipo número: ${id} editado correctamente`);
    } catch (error) {
      Alert.alert('Error', 'Ocurrió un error al editar el equipo');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../assets/logito.png')} style={styles.logo} />
        <Text style={styles.title}>Aplicación de inventario</Text>
        <Ionicons name="person-circle-outline" size={30} color="white" onPress={() => navigation.navigate('Account')} />
      </View>
      <Text style={styles.subtitle}>Equipos</Text>
      <AutocompleteSearch onSelectSuggestion={handleSelectSuggestion} />
      <ScrollView style={styles.scrollContainer}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          numColumns={2}
        />
      </ScrollView>
      <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.addButtonText}>Agregar</Text>
      </TouchableOpacity>
      <View style={styles.navBar}>
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('AssignmentsScreen')}>
          <FontAwesome5 name="home" size={24} color="white" />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Employees')}>
          <FontAwesome5 name="users" size={24} color="white" />
          <Text style={styles.navText}>Empleados</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Log')}>
          <MaterialIcons name="book" size={24} color="white" />
          <Text style={styles.navText}>Bitácora</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Equipment')}>
          <FontAwesome5 name="tools" size={24} color="white" />
          <Text style={styles.navText}>Equipos</Text>
        </TouchableOpacity>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Agregar Equipo</Text>
            <TextInput
              style={styles.input}
              placeholder="Nombre"
              placeholderTextColor="#00008b"
              value={newEquipment.nombre}
              onChangeText={(text) => setNewEquipment({ ...newEquipment, nombre: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="descripcion"
              placeholderTextColor="#00008b"
              value={newEquipment.descripcion}
              onChangeText={(text) => setNewEquipment({ ...newEquipment, descripcion: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="fecha_adquisision"
              placeholderTextColor="#00008b"
              value={newEquipment.fecha_adquisision}
              onChangeText={(text) => setNewEquipment({ ...newEquipment, fecha_adquisision: text })}
            />
            <TouchableOpacity style={styles.saveButton} onPress={handleAddEquipment}>
              <Text style={styles.saveButtonText}>Guardar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.closeButtonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={editModalVisible}
        onRequestClose={() => {
          setEditModalVisible(!editModalVisible);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Editar Equipo</Text>
            <TextInput
              style={styles.input}
              placeholder="Nombre"
              placeholderTextColor="#00008b"
              value={currentEquipment ? currentEquipment.nombre : ''}
              onChangeText={(text) => setCurrentEquipment({ ...currentEquipment, nombre: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="descripcion"
              placeholderTextColor="#00008b"
              value={currentEquipment ? currentEquipment.descripcion : ''}
              onChangeText={(text) => setCurrentEquipment({ ...currentEquipment, descripcion: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="fecha_adquisision"
              placeholderTextColor="#00008b"
              value={currentEquipment ? currentEquipment.fecha_adquisision : ''}
              onChangeText={(text) => setCurrentEquipment({ ...currentEquipment, fecha_adquisision: text })}
            />
      {currentEquipment && (
        <Picker
          selectedValue={currentEquipment.estado_equipo_id ?? ''}
          onValueChange={(itemValue) =>
            setCurrentEquipment({ ...currentEquipment, estado_equipo_id: itemValue })
          }
          style={styles.picker}
        >
          {estados.map((estado) => (
            <Picker.Item key={estado.id} label={estado.nombre} value={estado.id} />
          ))}
        </Picker>
      )}
            <TouchableOpacity style={styles.saveButton} onPress={handleEditEquipment}>
              <Text style={styles.saveButtonText}>Guardar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.closeButton} onPress={() => setEditModalVisible(!editModalVisible)}>
              <Text style={styles.closeButtonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#9acd32',
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 40,
  },
  logo: {
    width: 50,
    height: 50,
  },
  title: {
    fontSize: 20,
    color: '#FFFFFF',
  },
  subtitle: {
    fontSize: 18,
    color: '#FFFFFF',
    marginBottom: 10,
  },
  scrollContainer: {
    flex: 1,
    marginBottom: 10,
  },
  card: {
    backgroundColor: '#FFFFFF',
    margin: 5,
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#00008b',
    flex: 1,
  },
  cardText: {
    fontSize: 14,
    marginBottom: 5,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  actionButton: {
    backgroundColor: '#00008b',
    padding: 5,
    borderRadius: 5,
    marginLeft: 5,
  },
  deleteButton: {
    backgroundColor: '#d32f2f',
    padding: 5,
    borderRadius: 5,
    marginLeft: 5,
  },
  actionText: {
    color: '#FFFFFF',
    fontSize: 12,
  },
  addButton: {
    backgroundColor: '#00008b',
    padding: 10,
    borderRadius: 5,
    alignSelf: 'center',
    marginBottom: 10,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#00008b',
    paddingVertical: 10,
  },
  navButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  navText: {
    color: '#FFFFFF',
    fontSize: 12,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // semi-transparent background
  },
  modalView: {
    width: 300,
    backgroundColor: '#FFFFFF', // white background for modal
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    color: '#00008b', // darkblue color for text
    marginBottom: 15,
  },
  input: {
    height: 40,
    borderColor: '#00008b', // darkblue border color
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 10,
    width: '100%',
    color: '#00008b', // darkblue color for text input
  },
  picker: {
    width: '100%',
    height: 40,
    marginBottom: 10,
  },
  saveButton: {
    backgroundColor: '#32cd32', // limegreen background
    borderColor: '#32cd32', // limegreen border color
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
  saveButtonText: {
    color: '#FFFFFF', // white color for button text
    fontSize: 16,
  },
  closeButton: {
    backgroundColor: '#d32f2f', // red background
    borderColor: '#d32f2f', // red border color
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    width: '100%',
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#FFFFFF', // white color for button text
    fontSize: 16,
  },
});
