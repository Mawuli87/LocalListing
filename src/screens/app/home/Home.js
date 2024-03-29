import { View, Text, SafeAreaView, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import Header from '../../../components/header/Header';
import { categories } from '../../../data/categories';
import { styles } from './styles';
import CategoryBox from '../../../components/categoryBox/CategoryBox';
import { products } from '../../../data/products';
import ProductHomeItem from '../../../components/productItem/ProductHomeItem';
import HeightSpacer from '../../../components/hightSpace/HeightSpacer';

const Home = ({navigation}) => {
  const [selectedCategory, setSelectedCategory] = useState();
    const [keyword, setKeyword] = useState();
 const [filteredProducts, setFilteredProducts] = useState(products);

 useEffect(()=>{
        if (selectedCategory && !keyword) {
            const updatedProducts = products.filter(product => String(product?.category) === String(selectedCategory));
            setFilteredProducts(updatedProducts);
        } else if (selectedCategory && keyword) {
            const updatedProducts = products.filter(product => String(product?.category) === String(selectedCategory) && product?.title?.toLowerCase().includes(keyword?.toLowerCase()));
            setFilteredProducts(updatedProducts);
        } else if (!selectedCategory && keyword) {
            const  updatedProducts = products.filter(product => product?.title?.toLowerCase().includes(keyword?.toLowerCase()));
            setFilteredProducts(updatedProducts);
        } else if (!keyword && !selectedCategory) {
            setFilteredProducts(products);
        }
 },[selectedCategory,keyword])

      const renderCategoryItem = ({ item, index }) => {
        return (
            <CategoryBox
                onPress={() => setSelectedCategory(item?.id)}
                isSelected={item?.id === selectedCategory}
                isFirst={index === 0}
                title={item?.title}
                image={item?.image}
            />
        );
    };

       const renderProductItem = ({ item }) => {
        const onProductPress = (product) => {
            navigation.navigate('ProductDetails',  {item});
        };

      
        return (
            <ProductHomeItem 
              title={item?.title}
              price={item.price}
              image={item?.image}
             onPress={() => onProductPress(item.id)} />
        );
    };


  return (
      <SafeAreaView>
            <Header showSearch onSearch={setKeyword} keyword={keyword}   title='Find All You Need' />
              
             <View>
                <FlatList
                showsHorizontalScrollIndicator={false}
                style={styles.list}
                horizontal
                data={categories}
                renderItem={renderCategoryItem}
                keyExtractor={(item, index) => String(index)}
            />
             </View>

            {/* <HeightSpacer height={20} /> */}

           <View style={styles.main}>
              <FlatList
                style={styles.productsList}
                showsVerticalScrollIndicator={false}
                numColumns={2}
                 data={filteredProducts}
                renderItem={renderProductItem}
                keyExtractor={(item, index) => String(index)}
                ListFooterComponent={<View style={{ height: 200 }} />}
            /> 
            
           </View>  
            
        </SafeAreaView>
  )
}

export default React.memo(Home);