import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import {Text, Dimensions, View} from 'react-native';
import styled from 'styled-components';
import 'react-native-vector-icons';

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

    /* return () => {
      setPlant([]);
    } */
  }, [])

  return (
    <ProductContainer>
      <ProductCoverImageContainer 
        pagingEnabled
        horizontal
        showHorizontalScrollIndicator = {false}
        width = {width} 
        height = {height}
      >
        {plant.map((item, index) => (
          <>
            {index ?
              <ProductCoverImage 
                key = {`cover-image${item.id}`}
                source = {{uri: item.path}} 
                width = {width} 
                height = {height}
              />
            :
              <ProductCoverImage 
                key = {`image-${item.id}`}
                source = {{uri: item.path}} 
                width = {width} 
                height = {height}
              />
            }
          </>
        ))}
     {/*    <DotButtonContainer
          bottom = {0}
        >
          {plant.map(() => (
            <DotButton>
              .
            </DotButton>
          ))}
        </DotButtonContainer> */}
      </ProductCoverImageContainer>
      <InfoContainer>
        <Text>a</Text>
      </InfoContainer>
    </ProductContainer>
  )
}

const ProductContainer = styled.View`
  flex: 1;
  background: #a7c957;
`;

const ProductCoverImageContainer = styled.ScrollView`
  position: relative;
  /* width: 100%; */
  /* height: 150px; */
  width: ${props => props.width}px;
  height: ${props => props.height}px;
`;

const ProductCoverImage = styled.Image`
  /* width: 100px; */
  /* height: 50px; */
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  /* border-bottom-right-radius: 8px; */
  /* border-bottom-left-radius: 8px; */
`;

const DotButtonContainer = styled.View`
  flex-direction: row;
  position: absolute;
  bottom: 0;  
`;

const DotButton = styled.Text`
  font-size: 100px;
  color: #000000;
  margin: 3px;
`;

/* const BackButton = styled.TouchableOpacity`
  position: absolute;
  top: 4px;
  left: 4px;
`; */

const InfoContainer = styled.View`
  
`;

