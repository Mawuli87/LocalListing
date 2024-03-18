import { View, Text, SafeAreaView } from 'react-native';
import React from 'react';
import Splash from './src/screens/auth/splash';
import SignUp from './src/screens/auth/signup/SignUp';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import Config from 'react-native-config';

const App = () => {
 

  GoogleSignin.configure({
  scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
  webClientId: '383019829097-gs951k3jsnm51kds70j7boohhc1tp961.apps.googleusercontent.com', // client ID of type WEB for your server. Required to get the idToken on the user object, and for offline access.
  offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
  iosClientId: '<FROM DEVELOPER CONSOLE>', // [iOS] if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
});


  return (
    <SafeAreaView>
      {/* <Splash/> */}
      <SignUp/>
    </SafeAreaView>
  );
}

export default App