// screens/AssignmentsScreen.js
import React, { useState, useEffect } from 'react';
import {
  View, Text, Image, TextInput, TouchableOpacity, StyleSheet, FlatList, Modal,
  Alert
} from 'react-native';
import { Ionicons, FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';

export default function AssignmentsScreen({ navigation }) {
  const API_URL = 'http://localhost:3000/asignaciones';
  const [modalVisible, setModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [newAssignment, setNewAssignment] = useState({
     id_equipo : '', id_usuario: '', fecha_asignacion: '', id_empleado: ''
  });
  const [currentAssignment, setCurrentAssignment] = useState(null);
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
      Alert.alert('Error', 'Ocurrió un error al cargar las asignaciones');
      setLoading(false);
      console.error(error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.asignacion_id}</Text>
      <Text style={styles.cell}>{item.nombre_equipo}</Text>
      <Text style={styles.cell}>{item.nombre_empleado}</Text>
      <Text style={styles.cell}>{item.nombre_usuario}</Text>
      <Text style={styles.cell}>{item.fecha_asignacion}</Text>
      <TouchableOpacity
        style={styles.actionButton}
        onPress={() => {
          setCurrentAssignment(item);
          setEditModalVisible(true);
        }}
      >
        <Text style={styles.actionText}>Editar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.actionButton}>
        <Text style={styles.actionText}>Borrar</Text>
      </TouchableOpacity>
    </View>
  );

  const handleAddAssignment = async () => {
    try {
      const response = await axios.post(API_URL, newAssignment);
      fetchAssignments();
      setModalVisible(false);
      setNewAssignment({
        id_equipo : '', id_usuario: '', fecha_asignacion: ''});
    }
    catch (error) {
      Alert.alert('Error', 'Ocurrió un error al agregar la asignación');
      console.error(error);
    }
  };

  const handleEditAssignment =  async () => {
    try{
      const response = await axios.put(`${API_URL}/${currentAssignment.asignacion_id}`, currentAssignment);
      fetchAssignments();
      setEditModalVisible(false);
      setCurrentAssignment(null);
    }catch (error){
      Alert.alert('Error', 'Ocurrió un error al editar la asignación');
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
      <Text style={styles.subtitle}>Asignaciones</Text>
      <TextInput style={styles.searchBar} placeholder="Buscar..." placeholderTextColor="#FFFFFF" />
      <View style={styles.tableHeader}>
        <Text style={styles.headerCell}>No. asignación</Text>
        <Text style={styles.headerCell}>Equipo</Text>
        <Text style={styles.headerCell}>Empleado</Text>
        <Text style={styles.headerCell}>usuario</Text>
        <Text style={styles.headerCell}>Fecha</Text>
        <Text style={styles.headerCell}>Acciones</Text>
      </View>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        style={styles.table}
      />
      <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.addButtonText}>Agregar</Text>
      </TouchableOpacity>
      <View style={styles.pagination}>
        <TouchableOpacity style={styles.pageButton}>
          <Text style={styles.pageText}>Anterior</Text>
        </TouchableOpacity>
        <Text style={styles.pageNumber}>1</Text>
        <TouchableOpacity style={styles.pageButton}>
          <Text style={styles.pageText}>Siguiente</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.navBar}>
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Assignments')}>
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
            <Text style={styles.modalText}>Agregar Asignación</Text>
            <TextInput
              style={styles.input}
              placeholder="No. equipo"
              placeholderTextColor="#00008b"
              value={newAssignment.id_equipo}
              onChangeText={(text) => setNewAssignment({ ...newAssignment, id_equipo: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="No. usuario"
              placeholderTextColor="#00008b"
              value={newAssignment.id_usuario}
              onChangeText={(text) => setNewAssignment({ ...newAssignment, id_usuario: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="No. empleado"
              placeholderTextColor="#00008b"
              value={newAssignment.id_empleado}
              onChangeText={(text) => setNewAssignment({ ...newAssignment, id_empleado: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Fecha de asignación"
              placeholderTextColor="#00008b"
              value={newAssignment.fecha_asignacion}
              onChangeText={(text) => setNewAssignment({ ...newAssignment, fecha_asignacion: text })}
            />
            <TouchableOpacity style={styles.saveButton} onPress={handleAddAssignment}>
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
              value={currentAssignment ? currentAssignment.id_equipo : ''}
              onChangeText={(text) => setCurrentAssignment({ ...currentAssignment, id_equipo: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="No. usuario"
              placeholderTextColor="#00008b"
              value={currentAssignment ? currentAssignment.id_usuario : ''}
              onChangeText={(text) => setCurrentAssignment({ ...currentAssignment, id_usuario: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="No. empleado"
              placeholderTextColor="#00008b"
              value={currentAssignment ? currentAssignment.id_empleado : ''}
              onChangeText={(text) => setCurrentAssignment({ ...currentAssignment, id_empleado: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Fecha de asignación"
              placeholderTextColor="#00008b"
              value={currentAssignment ? currentAssignment.fecha_asignacion : ''}
              onChangeText={(text) => setCurrentAssignment({ ...currentAssignment, fecha_asignacion: text })}
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
    backgroundColor: '#9acd32', // yellowgreen background
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 40, // Add some margin from the top
  },
  logo: {
    width: 50,
    height: 50,
  },
  title: {
    fontSize: 20,
    color: '#FFFFFF', // white color for text
  },
  subtitle: {
    fontSize: 18,
    color: '#FFFFFF', // white color for text
    marginBottom: 10,
  },
  searchBar: {
    height: 40,
    borderColor: '#FFFFFF', // white border
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 10,
    color: '#FFFFFF', // white color for text input
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#00008b', // darkblue border
    paddingBottom: 5,
    marginBottom: 5,
    backgroundColor: '#00008b', // darkblue background for table header
  },
  headerCell: {
    flex: 1,
    color: '#FFFFFF', // white color for text
    textAlign: 'center',
    fontWeight: 'bold',
  },
  table: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
    backgroundColor: '#FFFFFF', // white background for rows
    borderColor: '#00008b', // darkblue border color
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
  },
  cell: {
    flex: 1,
    color: '#000000', // black color for text
    textAlign: 'center',
  },
  actionButton: {
    backgroundColor: '#00008b', // darkblue background
    borderColor: '#00008b', // darkblue border color
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    marginLeft: 5,
  },
  actionText: {
    color: '#FFFFFF', // white color for button text
    fontSize: 12,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  pageButton: {
    backgroundColor: '#00008b', // darkblue background
    borderColor: '#00008b', // darkblue border color
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    marginHorizontal: 10,
  },
  pageText: {
    color: '#FFFFFF', // white color for button text
  },
  pageNumber: {
    fontSize: 16,
    color: '#FFFFFF', // white color for text
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#00008b', // darkblue background
    paddingVertical: 10,
  },
  navButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  navText: {
    color: '#FFFFFF', // white color for text
    fontSize: 12,
  },
  addButton: {
    backgroundColor: '#00008b', // limegreen background
    borderColor: '#00008b', // limegreen border color
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    alignSelf: 'center',
    marginBottom: 10, // Adjusted to place the button above pagination and nav bar
  },
  addButtonText: {
    color: '#FFFFFF', // white color for button text
    fontSize: 16,
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
