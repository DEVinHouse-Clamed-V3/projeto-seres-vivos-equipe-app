import { useState, useEffect } from "react";
import {
  Text,
  SafeAreaView,
  FlatList,
  Alert,
  Image,
  View,
  StyleSheet,
  TextInput
} from "react-native";
import { globalStyles } from "../styles/global";
import axios from "axios";

const Protista = () => {
  const [protistas, setProtistas] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState([]);

  useEffect(() => {
    axios
      .get("http://192.168.1.150:3000/protista")
      .then((response) => {
        setProtistas(response.data);
        setFilteredData(response.data);
      })
      .catch((error) => {
        Alert.alert("Não foi possível obter a lista dos protistas");
        console.log(error);
      });
  }, []);

  const handleSearch = (text) => {
    setSearch(text);
    if (text) {
      const filtered = protistas.filter((item) =>
        item.name.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(protistas);
    }
  };

  return (
    <SafeAreaView style={globalStyles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Buscar..."
        value={search}
        onChangeText={handleSearch}
      />
      <FlatList
        data={filteredData}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image style={styles.cardImage} source={{ uri: item.image }} />

            <Text style={styles.cardTitle}>{item.name}</Text>

            <View style={styles.row}>
              <Text style={styles.cardLabel}>Descrição: </Text>
              <Text style={styles.cardText}>{item.description}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.cardLabel}>Nutrição: </Text>
              <Text style={styles.cardText}>{item.nutrition}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.cardLabel}>Tipo celular: </Text>
              <Text style={styles.cardText}>{item.cellType}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.cardLabel}>Oraganização celular: </Text>
              <Text style={styles.cardText}>{item.cellOrganization}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.cardLabel}>Reprodução: </Text>
              <Text style={styles.cardText}>{item.reproduction}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.cardLabel}>Respiração: </Text>
              <Text style={styles.cardText}>{item.respiration}</Text>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default Protista;

const styles = StyleSheet.create({
  searchBar: {
    height: 40,
    margin: 10,
    backgroundColor: '#F9F7F3',
    borderColor: '#2E8B57',
    borderWidth: 1,
    borderRadius: 5,
    padding: 8
  },  
  card: {
    backgroundColor: "#F9F7F3",
    alignSelf: "center",
    width: "90%",
    marginTop: 15,
    borderRadius: 20,
    padding: 15,
    justifyContent: "center",
    gap: 5,
  },
  row: {
    flexDirection: "row",
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2E8B57",
    textAlign: "left",
  },
  cardLabel: {
    fontSize: 14,
    fontWeight: "bold",
  },
  cardText: {
    fontSize: 14,
    flexShrink: 1,
    color: "#E07A5F",
    fontWeight: "500",
    fontStyle: "italic",
  },
  cardImage: {
    width: 200,
    height: 200,
    alignSelf: "center",
    marginBottom: 15,
    borderRadius: 15,
  },
});
