import React, { useContext } from 'react';
import { Alert, FlatList, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


import { ServicesContext } from '../../../../App';
//import { updateService } from '../../../utils/backendCalls';
import FavoriteItem from '../../../components/favoriteItem/FavoriteItem';
import Header from '../../../components/header/Header';
import { products } from '../../../data/products';

const Favorites = ({ navigation }) => {
    //const { services, setServices } = useContext(ServicesContext);
   // const likedServices = Array.isArray(services) ? services?.filter(service => service?.liked) : [];

    const renderItem = ({ item }) => {
        const onProductPress = () => {
            navigation.navigate('ProductDetails', { item: item });
        };
        const onRemove = async () => {
           // const updatedServices = await updateService(item?._id, { liked: false });
            if (Array.isArray(updatedServices)) {
                setServices(updatedServices);
            }
        };
        const onIconPress = () => {
            Alert.alert('Are you sure you want to remove this item from your favorites?', '', [{ text: 'Yes', onPress: onRemove }, { text: 'Cancel' }]);
        };
        // title, price, icon, image, onPress, onIconPress
        return (
            <FavoriteItem 
             title={item?.title}
              price={item.price}
              icon={item.icon}
              image={item?.image}
             onPress={onProductPress} 
             onIconPress={onIconPress}  />
        );
    };

    return (
        <SafeAreaView>
            <Header title='Favorites' />

            <FlatList 
            ListEmptyComponent={(<Text style={{ textAlign: 'center', marginTop: 40 }}>You do not have any favorites yet</Text>)}
             data={products} renderItem={renderItem}
              keyExtractor={(item, index) => String(index)} />
        </SafeAreaView>
    );
};

export default React.memo(Favorites);
