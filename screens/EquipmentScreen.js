// screens/EquipmentScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const EquipmentScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Equipos</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9acd32',
  },
  text: {
    color: '#FFFFFF',
    fontSize: 20,
  },
});

export default EquipmentScreen;
