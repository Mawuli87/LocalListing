import { Image } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/app/home/Home';
import Favorites from '../screens/app/favorites/Favorites';
import Profile from '../screens/app/profile/Profile';
import { colors } from '../utils/colors';
import ProductDetails from '../screens/app/productDetails/ProductDetails';
import Settings from '../screens/app/settings/Settings';
import CreateListing from '../screens/app/createListing/CreateListing';
import MyListings from '../screens/myListing/MyListings';
import signin from '../screens/auth/signin';
import Splash from '../screens/auth/splash/Splash';
import SignUp from '../screens/auth/signup/SignUp';
import { UserContext } from '../../App';
import { addTokenToAxios } from '../utils/request';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


const ProfileStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
            <Stack.Screen name="Settings" component={Settings} options={{ headerShown: false }} />
            <Stack.Screen name="CreateListing" component={CreateListing} options={{ headerShown: false }} />
            <Stack.Screen name="MyListings" component={MyListings} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}

const Tabs = () => (
    <Tab.Navigator
        screenOptions={({ route }) => ({
            tabBarIcon: ({ focused }) => {
                let icon;

                if (route.name === 'Home') {
                    icon = focused
                        ? require('../assets/tabs/home_active.png')
                        : require('../assets/tabs/home.png');
                } else if (route.name === 'ProfileStack') {
                    icon = focused
                        ? require('../assets/tabs/profile_active.png')
                        : require('../assets/tabs/profile.png');
                } else if (route.name === 'Favorites') {
                    icon = focused
                        ? require('../assets/tabs/bookmark_active.png')
                        : require('../assets/tabs/bookmark.png');
                }

                // You can return any component that you like here!
                return <Image style={{ width: 24, height: 24 }} source={icon} />
            },
            headerShown: false,
            tabBarShowLabel: false,
            tabBarStyle: { borderTopColor: colors.lightGrey }
        })}
    >
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Favorites" component={Favorites} />
        <Tab.Screen name="ProfileStack" component={ProfileStack} />
    </Tab.Navigator>
)

const Routes = () => {
     const [loading, setLoading] = useState(true);
    const { user, setUser } = useContext(UserContext);
    const isSignedIn = true;

    useEffect(() => {
        (async () => {
            const token = await AsyncStorage.getItem('auth_token');
            setUser({ token });
            
            
            setTimeout(() => {
                setLoading(false);
            }, 1000);
        })()
    }, []);

     useEffect(() => {
        if (user?.token) {
            addTokenToAxios(user?.token);
        }
    }, [user]);

    const theme = {
        colors: {
            background: colors.white,
        }
    }

    return (
        <NavigationContainer theme={theme}>
            <Stack.Navigator>
            {/**{user?.token ? */}
                {isSignedIn ? (
                    <>
                        <Stack.Screen name="Tabs" component={Tabs} options={{ headerShown: false }} />
                        <Stack.Screen name="ProductDetails" component={ProductDetails} options={{ headerShown: false }} />
                    </>
                ) : (
                    <>
                        <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }} />
                        <Stack.Screen name="Signin" component={signin} options={{ headerShown: false }} />
                        <Stack.Screen name="Signup" component={SignUp} options={{ headerShown: false }} />
                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
};


export default React.memo(Routes);