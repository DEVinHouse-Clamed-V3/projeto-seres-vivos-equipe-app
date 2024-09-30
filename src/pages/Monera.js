import React, { useEffect, useState, useRef } from 'react';
import { Text, SafeAreaView, StyleSheet, View, Image, ScrollView, FlatList, TextInput } from 'react-native';
import { globalStyles } from '../styles/global';
import axios from 'axios';

  
  // "id": "1",
  // "name": "Escherichia coli",
  // "description": "Bactéria comum no intestino humano.",
  // "nutrition": "Heterotrófico",
  // "cellType": "Procariontes",
  // "cellOrganization": "Unicelulares",
  // "reproduction": "Assexuada",
  // "respiration": "Anaeróbia",
  // "image": "https://via.placeholder.com/150"
  
  function topic(topic, info){
    return (
      <View style={styles.row}>
        <Text style={styles.topic}>{topic}</Text>
        <Text style={styles.info}>{info}</Text>
      </View>
    )
  }
  
  function Post({ name, image, description, nutrition, cellType, cellOrganization, reproduction, respiration }){
    
    return (
      <View style={styles.postContainer}>
        <Image source={{uri: image}} style={styles.image}/>
        <Text style={styles.name}>{name}</Text>
  
        {topic("descrição:", description)}
        {topic("nutrição:", nutrition)}
        {topic("tipe de célula:", cellType)}
        {topic("organização da celula:", cellOrganization)}
        {topic("reprodução:", reproduction)}
        {topic("respiração:", respiration)}
  
      </View>
    )  
  }
  
  const Monera = () => {
    const [data, setData] = useState([])
      
    const [search, setSearch] = useState("")

    useEffect(() => {
      
      axios.get('http://localhost:3001/monera').then(res => setData( 
        res.data.filter( item => item.name.toLowerCase().includes(search.toLowerCase())
        ))
      )
      .catch( err => {
        console.error(err)
      })
    
    }, [search])
  
    const viewabilityConfig = {
      itemVisiblePercentThreshold: 50, // Percentual mínimo do item que deve estar visível
    };
    
    const [viewable, setViewable] = useState([])
  
    const onViewableItemsChanged = useRef(({ viewableItems }) => {
      //console.log('Itens visíveis:', viewableItems);
      //console.log( viewableItems[0] )
      //const a = JSON.parse( viewableItems )
      //setViewable( a )
    });

  
    useEffect(() => {
       console.log( search )
    }, [search])
  
    const renderItem = ({ item }) => {
      //console.log(item.name)
      return Post( item )
    };
  
    return (
      <SafeAreaView style={[globalStyles.container, styles.container]}>
  
        <View style={styles.filter}>
          <TextInput value={search} onChangeText={setSearch}/>
        </View>
        
        {
          /*
            <ScrollView style={styles.container}>
              { data[0] ? data.map( item => Post( item )) : null }
            </ScrollView>
          */
        }
  
    <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={ renderItem }
        //onViewableItemsChanged={onViewableItemsChanged.current}
       // viewabilityConfig={viewabilityConfig}
      />
  
      </SafeAreaView>
    );

  
  };
  
  const colors = {
    backgound: "#F4D58D",
    postBackground: "#F9F7F3",
    title: "#2E8B57",
    info: "#E07A5F",
    topic: "black"//"#E07A5F"
  }
  
  const styles = StyleSheet.create({
  
    filter: {
      width: "100%",
      backgroundColor: "white",
      padding: 10
    },
  
    row: {
      flexDirection: "row"
    },
  
    info: {
      color: colors.info
    },
  
    topic: {
      fontStyle: 'italic',
      marginRight: 7,
      color: colors.topic
    },
  
    name: {
      fontWeight: "bold",
      fontSize: 15,
      marginBottom: 15,
      color: colors.title
    },
  
    image: {
      width: 150,
      height: 150,
      alignSelf: "center",
      marginBottom: 15,
    },
  
    postContainer: {
      width: "100%",
      backgroundColor: colors.postBackground,
      padding: 20,
      borderRadius: 20,
      marginTop: 20 
    },
  
    container: {
      width: "100%",
      padding: 10,
      backgroundColor: colors.backgound
    }
  
  })
  
  
  
  
  // (#F4D58D) ou Marfim (#F9F7F3) Fundo Principal
  // (#D3D3D3) para texto secundário,
  // (#2E8B57) para títulos.
  // (#2E8B57) ou Terracota (#E07A5F) botões
  // (#66B2FF) ou Cinza Claro (#D3D3D3) icones
  
  /*
  rgb(255, 89, 0)
  "Orange"
  rgb(204, 85, 0)
  
  rgb(29, 30, 34)
  rgb(28, 31, 36)
  #24252A
  #2C2C34
  
  Laranja vibrante: r255 g165 b0 (#FFA500) — essa cor é brilhante, mas não agressiva.
  Laranja queimado: r204 g85 b0 (#CC5500) — um tom mais suave e aconchegante, menos saturado.
  Laranja avermelhado: r255 g99 b71 (#FF6347) — traz um toque de vermelho, deixando o design mais dinâmico.
  Se você estiver disposto a trocar o fundo, aqui estão algumas sugestões para complementar esses tons de laranja:
  
  Cinza-escuro azulado: r36 g37 b42 () — um pouco mais claro que seu tom atual, mas ainda elegante e suave.
  Cinza carvão: r44 g44 b52 () — um tom neutro que cria um contraste moderno.
  Cinza com tom de azul: r28 g31 b36 () — adiciona uma pequena variação sem tirar o ar escuro.
  */


export default Monera;
