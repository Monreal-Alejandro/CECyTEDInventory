// screens/LogScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const LogScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Bitácora</Text>
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

export default LogScreen;
