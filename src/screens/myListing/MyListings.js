import React from 'react';
import { FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FavoriteItem from '../../components/favoriteItem/FavoriteItem';
import Header from '../../components/header/Header';
import { products } from '../../data/products';


const MyListings = ({ navigation }) => {
    const renderItem = ({ item }) => {
        const onProductPress = () => {
            navigation.navigate('ProductDetails', { item: item })
        }
        return (
            <FavoriteItem icon={require('../../assets/delete.png')} onPress={onProductPress} {...item} />
        )
    }

    const goBack = () => navigation.goBack()

    return (
        <SafeAreaView>
            <Header title="My Listings" showBack onBackPress={goBack} />

            <FlatList data={products} renderItem={renderItem} keyExtractor={(item, index) => String(index)} />
        </SafeAreaView>
    )
}

export default React.memo(MyListings);