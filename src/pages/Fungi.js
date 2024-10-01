import React, { useState, useEffect } from 'react';
import { Text, SafeAreaView, FlatList, TextInput, View, StyleSheet } from 'react-native';
import axios from 'axios';
import { globalStyles } from '../styles/global';

const Fungos = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    axios.get('http://192.0.1/Fungi') // colocar minha URL
      .then(response => {
        setData(response.data);
        setFilteredData(response.data); 
      })
      .catch(error => {
        console.error('Erro ao buscar dados da API:', error);
      });
  }, []);

  const handleSearch = (text) => {
    setSearch(text);
    if (text) {
      const filtered = data.filter(item => item.name.toLowerCase().includes(text.toLowerCase()));
      setFilteredData(filtered);
    } else {
      setFilteredData(data); 
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{item.name}</Text>
      <Text>{item.description}</Text>
    </View>
  );

  return (
    <SafeAreaView style={globalStyles.container}>
      <Text style={globalStyles.title}>Reino Fungi</Text>
      <TextInput
        style={styles.searchBar}
        placeholder="Buscar..."
        value={search}
        onChangeText={handleSearch}
      />
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id.toString()} 
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  searchBar: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    borderRadius: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Fungos;
