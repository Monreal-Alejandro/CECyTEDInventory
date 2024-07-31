import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

// Crear el contexto
const UserContext = createContext();

// Proveedor del contexto
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Función para recuperar el token y los datos del usuario
  const fetchUser = async () => {
    try {
      const token = await AsyncStorage.getItem('jwtToken');
      if (token) {
        // Configura Axios con el token
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        // Recuperar datos del usuario
        const response = await axios.get('https://estadiastsu-production.up.railway.app/usuarios'); // Ajusta la URL según tu API
        console.log('Datos del usuario recuperados:', response.data.user);
        setUser(response.data.user);
      }
    } catch (error) {
      console.error('Error fetching user', error);
    }
  };

  // Llamada a fetchUser cuando el componente se monta
  useEffect(() => {
    fetchUser();
  }, []);

  // Función para iniciar sesión
  const login = async (email, password) => {
    try {
      const response = await axios.post('https://estadiastsu-production.up.railway.app/usuarios/login', { email, password });
      const { token } = response.data;
  
      // Guardar el token en AsyncStorage
      await AsyncStorage.setItem('jwtToken', token);
  
      // Configurar el token en los encabezados de Axios
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  
      // Actualizar el estado del usuario
      await fetchUser(); // Llama a fetchUser para obtener los datos del usuario después de iniciar sesión
    } catch (error) {
      //console.error('Login error:', error);
      throw new Error('Error al iniciar sesión'); // Lanzar el error para que pueda ser manejado por la función que llama
    }
  };
  

  // Función para cerrar sesión
  const logout = async () => {
    try {
      await AsyncStorage.removeItem('jwtToken');
      axios.defaults.headers.common['Authorization'] = '';
      setUser(null);
    } catch (error) {
      console.error('Logout error', error);
    }
  };


  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook para usar el contexto
export const useUser = () => useContext(UserContext);
