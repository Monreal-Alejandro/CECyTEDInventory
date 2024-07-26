import React from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import axios from "axios";

const AutocompleteSearch = ({onSelectSuggestion}) => {
    const [query, setQuery] = React.useState("");
    const [suggestions, setSuggestions] = React.useState([]);

    const fetchSuggestions = async (busqueda) => {
        try {
            const response = await axios.get(`https://estadiastsu-production.up.railway.app/busquedas/empleados?busqueda=${busqueda}`);
            setSuggestions(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSearchInputChange = (busqueda) => {
        setQuery(busqueda);
        if (busqueda.length > 0) {
            fetchSuggestions(busqueda);
        } else {
            setSuggestions([]);
        }
    };

    const handleSelectSuggestion = (suggestion) => {
        setQuery(suggestion);
        setSuggestions([]);
        onSelectSuggestion(suggestion);
      };

    return (
        <View style={styles.container}>
          <TextInput
            style={styles.searchBar}
            placeholder="Buscar..."
            placeholderTextColor="#FFFFFF"
            value={query}
            onChangeText={handleSearchInputChange}
          />
          {suggestions.length > 0 && (
            <FlatList
              data={suggestions}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => handleSelectSuggestion(item.nombre)}>
                  <Text style={styles.suggestionItem}>{item.nombre}</Text>
                </TouchableOpacity>
              )}
              style={styles.suggestionList}
            />
          )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
      zIndex: 1, // Ensure the suggestions list is on top
    },
    searchBar: {
      backgroundColor: '#00008b',
      color: '#FFFFFF',
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: 5,
    },
    suggestionList: {
      backgroundColor: '#FFFFFF',
      position: 'absolute',
      top: 40,
      left: 0,
      right: 0,
      maxHeight: 150,
      zIndex: 1, // Ensure the suggestions list is on top
    },
    suggestionItem: {
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#ddd',
    },
  });
  
  export default AutocompleteSearch;