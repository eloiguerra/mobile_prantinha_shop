import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import styled from 'styled-components/native'

import api from '../../services/api';

export default function Home() {
  const [plants, setPlants] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All')

  useEffect(() => {
    // console.log('cavalo')
    api.get('/plants')
    .then(response => {
      console.log(response)
      setPlants(response.data)    
    })
    .catch(error => {
      console.log(error)
    })
  }, [])

  const changeCategory = category => setSelectedCategory(category)

  const ProductItem = product => {
    return (
      <Product>
        <ProductImage source = {product.pathUrl} />
      </Product>
    )
  }

  return (
    <Container>
      <Header>
        <Categories horizontal = {true} showsHorizontalScrollIndicator={false}>
          <Category>
            <CategoryName 
              selected = {selectedCategory === 'All' ? true : false }
            > 
              Todos
            </CategoryName> 
          </Category>
          <Category>
            <CategoryName> Flor </CategoryName> 
          </Category>
          <Category> 
            <CategoryName> Muda </CategoryName>
          </Category>
          <Category> 
            <CategoryName> Semente </CategoryName> 
          </Category>
        </Categories>
      </Header>
      <Products 
        data = {plants} 
        keyExtractor = {item => String(item.plantId)}
        renderItem = {({item}) => ProductItem(item)} 
      />
    </Container>
  )
}

const Container = styled.SafeAreaView`
  flex-grow: 1;
`;

const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 16px 32px 0 32px;
`;

const Categories = styled.ScrollView`
  margin-top: 32px;
  flex-grow: 0;
`;

const Category = styled.TouchableOpacity`
  align-items: center;
  margin: 0 16px;
  height: 32px;
`;

const CategoryName = styled(Text)``;

const Products = styled.FlatList`
  margin-top: 32px;
  flex: 1;
`;

const Product = styled.TouchableOpacity``;

const ProductImage = styled.Image``;