import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import {Text, Dimensions} from 'react-native';
import styled from 'styled-components';
import api from '../../services/api';

const {width} = Dimensions.get("window");
const height = width * 0.6;

export default function Plant({route, navigation}) {
  const [plant, setPlant] = useState([])
  useEffect(() => {
    api.get(`plants/${route.params.id}`)
    .then(response => {
      setPlant(response.data);
      // console.log(response.data)
    })
    .catch(err => {
      // console.log(err)
    })

    return () => {
      setPlant([]);
    }
  }, [])

  return (
    <ProductContainer>
        <StatusBar barStyle = "light-content" />
        <ProductCoverImageContainer 
          width = {width} 
          height = {height}
          pagingEnabled
          horizontal
          showHorizontalScrollIndicator = {false}
        >
          
            <Text style = {{color: 'white'}}>oi</Text>
          <BackButton onPress = {() => navigation.goBack()}>
            <Text> Voltar </Text>
          </BackButton>
        </ProductCoverImageContainer>
    </ProductContainer>
  )
}

const ProductContainer = styled.View`
  flex: 1;
  background: #a7c957;
`;

const ProductCoverImageContainer = styled.ScrollView`
  position: relative;
  /* width: ${props => props.width}px;
  height: ${props => props.height}px; */
`;

const ProductCoverImage = styled.Image`
  width: 100%;
  height: 350px;
  width: ${props => props.width}px;
  height: ${props => props.height}px;

  border-bottom-right-radius: 32px;
  border-bottom-left-radius: 32px;
`;

const BackButton = styled.TouchableOpacity`
  position: absolute;
  top: 4px;
  left: 4px;
`;

/* {plant.map((item, index) => {
  <ProductCoverImage
    key = {`image-${item.id}`}
    source = {{uri: item.coverImage}}
    width = {width}
    height = {height}
    style = {{resizeMode: 'cover'}}
  /> 
})}  */