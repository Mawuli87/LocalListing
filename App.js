import { View, Text, SafeAreaView } from 'react-native';
import React, { useEffect } from 'react';

import SignUp from './src/screens/auth/signup/SignUp';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import Config from 'react-native-config';
import Signin from './src/screens/auth/signin';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Splash from './src/screens/auth/splash/Splash';

const Stack = createNativeStackNavigator();

const App = () => {
 

  useEffect(()=>{
      GoogleSignin.configure({
  scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
  webClientId: '383019829097-gs951k3jsnm51kds70j7boohhc1tp961.apps.googleusercontent.com', // client ID of type WEB for your server. Required to get the idToken on the user object, and for offline access.
  offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
  iosClientId: '<FROM DEVELOPER CONSOLE>', // [iOS] if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
});

  },[])

  return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Splash">
       <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Signin" component={Signin} />
         <Stack.Screen name="Signup" component={SignUp} />
         </Stack.Navigator>
      </NavigationContainer>
   
  );
}

export default App