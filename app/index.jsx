import { Text, View, StyleSheet, ImageBackground, Image, ScrollView } from "react-native";
import { Input } from '../components/input/input'
import { Botao } from '../components/botao/botao'
import { Card } from '../components/card/card'
import axios from 'axios';
import { useState } from "react";

export default function Index() {

  const[cep, setCep] = useState("");
  const[jsonCep, setJsonCep] = useState({});

  async function consultarCep(e) {
    e.preventDefault();
    try {
      if (cep !== "" && cep.length === 8) {
        const resposta = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);

        setJsonCep(resposta.data);
        
        // console.log(jsonCep.logradouro);
        
      } else {
        alert("O cep esta incorreto, digite com 8 numeros!")
      }
    } catch (error) {
      console.log(error);

    }
  }
  return (
    <>
      {/* 1. Logo + Imagem de fundo */}
      <ImageBackground source={require('../assets/images/fundo.png')} style={styles.imgFundo}>
        <Image source={require('../assets/images/LogoFindCEP.png')} style={styles.logo}></Image>
      </ImageBackground>
      {/* 2. Campo de Consulta */}
      <ScrollView style={styles.containerScroll}>
        <View style={styles.container}>
          {/* 2.1 Titulo */}
          <Text style={styles.titulo}>Consulte seu CEP</Text>
          {/* 2.2 Input */}
          <Input
          valorCep={cep}
          onChangeValorCep={e => setCep(e)}
          />
          {/* 2.3 Botão */}
          <Botao tituloBotao="Consultar" onPress={consultarCep} />
          {/* 2.3 Card de informações */}
          {jsonCep.cep && (<Card 
          cep={jsonCep.cep}
          logradouro={jsonCep.logradouro} 
          bairro={jsonCep.bairro} 
          uf={jsonCep.uf} 
          estado={jsonCep.estado} 
          regiao={jsonCep.regiao}
          />)}
          
        </View>
      </ScrollView>
    </>
  );
}

//Estilos dos meus componentes:
const styles = StyleSheet.create({
  imgFundo: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%'
  },
  logo: {
    width: 100,
    height: 120
  },
  container: {
    gap: 40,
    width: "100%",
    minHeight: "100%",
    alignItems: 'center'
  },
  titulo: {
    fontSize: 25,
    fontFamily: 'Poppins-Bold'
  },
  containerScroll: {
    flex: 1.5,
    paddingTop: 50,
    height: "100%",
    paddingBottom: 230
  }

})