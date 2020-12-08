import React, {useEffect, useState, useRef} from 'react';
import {View, Text, Image} from 'react-native';
import styled from 'styled-components/native'

import api from '../../services/api';

export default function Home({navigation}) {
  const [plants, setPlants] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All')

  const plantsRef = useRef();

  useEffect(() => {
    api.get('/plants')
    .then(response => {
      setPlants(response.data)    
    })
    .catch(error => {
      console.log(error)
    })
  }, [])
  const categories = [
    {value: 'All', viewValue: 'Todos'},
    {value: 'carnivorousPlant', viewValue: 'Plantas carnívoras'},
    {value: 'suculents', viewValue: 'Suculentas'},
    {value: 'Seeds', viewValue: 'Sementes'},
  ]

  const changeCategory = category => {
    plantsRef.current.scrollToOffset({x: 0, y: 0})
    setSelectedCategory(category)
  }

  const ProductItem = product => {
    return (
      <Product onPress = {() => navigation.navigate('Plant', {id: product.id})}>
        <ProductImage source = {{uri:product.coverImage}} />
        <ProductInfo>
          <ProductTitle>
            <Text>{product.name}</Text>
            <Text>Preço: R${product.price}</Text>
          </ProductTitle>
        </ProductInfo>
      </Product>
    )
  }

  return (
    <Container>
      <Header>
        <Categories horizontal = {true} showsHorizontalScrollIndicator={false}>
          {categories.map((item, index) => (
              <Category key = {`category-${index}`} onPress = {() => changeCategory(item.value)}>
                <CategoryName 
                  selected = {selectedCategory === item.value ? true : false }
                > 
                  {item.viewValue}
                </CategoryName> 
              </Category>
          ))}
        </Categories>
      </Header>
      <Products 
        data = {plants.filter(item => {
          return item.type.includes(selectedCategory) || selectedCategory === 'All';
        })} 
        keyExtractor = {item => String(item.id)}
        renderItem = {({item}) => ProductItem(item)} 
        ref = {plantsRef}
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

/* const SelectedCategory =  styled.View`
  height: 1px;
  width: 100%;
  border-radius: 50px;
  color: #52b788;
`; */

const CategoryName = styled(Text)`
  color: ${props => props.selected ? '#6a994e' : '#000000'}; 
`;

const Products = styled.FlatList`
  margin-top: 32px;
  flex: 1;
`;

const Product = styled.TouchableOpacity`
  margin-bottom: 32px;

  background: #ffffff;
`;

const ProductImage = styled.Image`
  height: 300px;
  width: 100%;
`;

const ProductInfo = styled.View`
  padding: 8px;
  border-radius: 8px;

  align-items: center;
`;

const ProductTitle = styled.View`

`;