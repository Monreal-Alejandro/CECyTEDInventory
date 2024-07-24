import React, { useState, useEffect } from 'react';
import {
  View, Text, Image, TextInput, TouchableOpacity, StyleSheet, ScrollView,
  Modal, Alert, FlatList
} from 'react-native';
import { Ionicons, FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';
import AutocompleteSearch from '../components/SearchComponent';

export default function LogScreen({ navigation }) {
  const API_URL = 'https://estadiastsu-production.up.railway.app/bitacoras';
  const [modalVisible, setModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [newLogs, setnewLogs] = useState({
    id_equipo: '', id_usuario: '', id_asignacion: '', descripcion: ''
  });
  const [currentLogs, setcurrentLogs] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAssignments();
  }, []);

  const fetchAssignments = async () => {
    try {
      const response = await axios.get(API_URL);
      setData(response.data);
      setLoading(false);
    } catch (error) {
      Alert.alert('Error', 'Ocurrió un error al cargar las bitácoras');
      setLoading(false);
      console.error(error);
    }
  };

  const handleSelectSuggestion = async (suggestion) => {
    try {
      const response = await axios.get(`https://estadiastsu-production.up.railway.app/busquedas/asignaciones?busqueda=${suggestion}`);
      setData(response.data);
    } catch (error) {
      console.log('Error en la búsqueda: ', error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.cardText}>
        <Text style={{ fontWeight: 'bold' }}>No. Bitácora: </Text>
        {item.id}
      </Text>
      <Text style={styles.cardText}>
        <Text style={{ fontWeight: 'bold' }}>Fecha de la bitácora: </Text>
        {item.fecha}
      </Text>
      <Text style={styles.cardText}>
        <Text style={{ fontWeight: 'bold' }}>Descripción: </Text>
        {item.descripcion}
      </Text>
      <Text style={styles.cardText}>
        <Text style={{ fontWeight: 'bold' }}>Usuario: </Text>
        {item.nombre_usuario}
      </Text>
      <Text style={styles.cardText}>
        <Text style={{ fontWeight: 'bold' }}>Equípo: </Text>
        {item.nombre_equipo}
      </Text>
      <Text style={styles.cardText}>
        <Text style={{ fontWeight: 'bold' }}>Fecha de asignación: </Text>
        {item.fecha_asignacion}
      </Text>
      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => {
            setcurrentLogs(item);
            setEditModalVisible(true);
          }}
        >
          <Text style={styles.actionText}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => handleDeleteLog(item.id)}
        >
          <Text style={styles.actionText}>Borrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const handleAddLog = async () => {
    try {
      const response = await axios.post(API_URL, newLogs);
      fetchAssignments();
      setModalVisible(false);
      setnewLogs({
        id_equipo: '', id_usuario: '', id_asignacion: '', descripcion: ''
      });
      Alert.alert('Éxito', `Bitácora agregada correctamente`);
    } catch (error) {
      Alert.alert('Error', 'Ocurrió un error al agregar la Bitácora');
      console.error(error);
    }
  };

  const handleDeleteLog = async (id) => {
    Alert.alert(
      'Confirmar Eliminación',
      '¿Estás seguro de que deseas eliminar esta bitácora?',
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
              const idDel=id;
              await axios.delete(`${API_URL}/${id}`);
              Alert.alert('Éxito', `Bitácora eliminada correctamente con el número de bitácora: ${idDel}`);
              fetchAssignments();
            } catch (error) {
              Alert.alert('Error', 'Ocurrió un error al borrar la asignación');
              console.error(error);
            }
          },
          style: 'destructive',
        },
      ],
      { cancelable: true }
    );
  };

  const handleEditAssignment = async () => {
    try {
      const { id } = currentLogs;
      const response = await axios.put(`${API_URL}/${currentLogs.id}`, currentLogs);
      fetchAssignments();
      setEditModalVisible(false);
      setcurrentLogs(null);
      Alert.alert('Éxito', `Bitácora número: ${id} editada correctamente`);
    } catch (error) {
      Alert.alert('Error', 'Ocurrió un error al editar la bitácora');
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
      <Text style={styles.subtitle}>Bitácoras</Text>
      <AutocompleteSearch onSelectSuggestion={handleSelectSuggestion} />
      <ScrollView style={styles.scrollContainer}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
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
            <Text style={styles.modalText}>Agregar Bitácora</Text>
            <TextInput
              style={styles.input}
              placeholder="No. equipo"
              placeholderTextColor="#00008b"
              value={newLogs.id_equipo}
              onChangeText={(text) => setnewLogs({ ...newLogs, id_equipo: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="No. usuario"
              placeholderTextColor="#00008b"
              value={newLogs.id_usuario}
              onChangeText={(text) => setnewLogs({ ...newLogs, id_usuario: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="No. de asignación"
              placeholderTextColor="#00008b"
              value={newLogs.id_asignacion}
              onChangeText={(text) => setnewLogs({ ...newLogs, id_asignacion: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Descripción"
              placeholderTextColor="#00008b"
              value={newLogs.descripcion}
              onChangeText={(text) => setnewLogs({ ...newLogs, descripcion: text })}
            />
            <TouchableOpacity style={styles.saveButton} onPress={handleAddLog}>
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
            <Text style={styles.modalText}>Editar Asignación</Text>
            <TextInput
              style={styles.input}
              placeholder="No. equipo"
              placeholderTextColor="#00008b"
              value={currentLogs ? currentLogs.nombre_equipo : ''}
              onChangeText={(text) => setcurrentLogs({ ...currentLogs, nombre_equipo: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="No. usuario"
              placeholderTextColor="#00008b"
              value={currentLogs ? currentLogs.nombre_usuario : ''}
              onChangeText={(text) => setcurrentLogs({ ...currentLogs, id_usuario: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Descripción"
              placeholderTextColor="#00008b"
              value={currentLogs ? currentLogs.descripcion : ''}
              onChangeText={(text) => setcurrentLogs({ ...currentLogs, descripcion: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Fecha de asignación"
              placeholderTextColor="#00008b"
              value={currentLogs ? currentLogs.fecha : ''}
              onChangeText={(text) => setcurrentLogs({ ...currentLogs, fecha: text })}
            />
            <TouchableOpacity style={styles.saveButton} onPress={handleEditAssignment}>
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
