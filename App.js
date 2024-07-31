// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import AssignmentsScreen from './screens/AssignmentsScreen';
import AccountScreen from './screens/AccountScreen';
import EmployeesScreen from './screens/EmployeesScreen';
import LogScreen from './screens/LogScreen';
import EquipmentScreen from './screens/EquipmentScreen';
import { UserProvider } from './context/UserContext';

const Stack = createStackNavigator();

export default function App() {
  return (
    <UserProvider>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
        <Stack.Screen name="AssignmentsScreen" component={AssignmentsScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Account" component={AccountScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Employees" component={EmployeesScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Log" component={LogScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Equipment" component={EquipmentScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
    </UserProvider>
  );
}



