import { View, Text, SafeAreaView, Image } from 'react-native';
import React, { useEffect } from 'react';

import SignUp from './src/screens/auth/signup/SignUp';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import Config from 'react-native-config';
import Signin from './src/screens/auth/signin';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Splash from './src/screens/auth/splash/Splash';
import Home from './src/screens/app/home/Home';
import Favorites from './src/screens/app/favorites/Favorites';
import Profile from './src/screens/app/profile/Profile';
import { colors } from './src/utils/colors';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const Tabs = () => (
  <Tab.Navigator 
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let icon;

        if (route.name === 'Home') {
          icon = focused
            ? require('./src/assets/tabs/home_active.png')
            : require('./src/assets/tabs/home.png');
        } else if (route.name === 'Profile') {
          icon = focused
            ? require('./src/assets/tabs/profile_active.png')
            : require('./src/assets/tabs/profile.png');
        } else if (route.name === 'Favorites') {
          icon = focused
            ? require('./src/assets/tabs/bookmark_active.png')
            : require('./src/assets/tabs/bookmark.png');
        }

        // You can return any component that you like here!
        return <Image style={{ width: 24, height: 24 }} source={icon} />
      },
      headerShown: false,
      tabBarShowLabel: true,
      tabBarStyle: { borderTopColor: colors.lightGrey,paddingBottom:8,paddingTop:5 }
    })}
  >
    <Tab.Screen name="Home" component={Home} />
    <Tab.Screen name="Favorites" component={Favorites} />
    <Tab.Screen name="Profile" component={Profile} />
  </Tab.Navigator>
)

const App = () => {
   const isSignedIn = true;

useEffect(()=>{
 GoogleSignin.configure({
  scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
  webClientId: '383019829097-gs951k3jsnm51kds70j7boohhc1tp961.apps.googleusercontent.com', // client ID of type WEB for your server. Required to get the idToken on the user object, and for offline access.
  offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
  iosClientId: '<FROM DEVELOPER CONSOLE>', // [iOS] if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
});

  },[])

  const theme = {
    colors: {
      background: colors.orange,
    }
  }

  return (
    <SafeAreaProvider >
      <NavigationContainer>
        <Stack.Navigator>
          {isSignedIn ? (
            <>
              <Stack.Screen name="Tabs" component={Tabs} options={{ headerShown: false }} />
            </>
          ) : (
            <>
              <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }} />
              <Stack.Screen name="Signin" component={Signin} options={{ headerShown: false }} />
              <Stack.Screen name="Signup" component={SignUp} options={{ headerShown: false }} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
   </SafeAreaProvider>
  );
}

export default App