import { View, Text, SafeAreaView } from 'react-native';
import React from 'react';
import Splash from './src/screens/auth/splash';
import SignUp from './src/screens/auth/signup/SignUp';

const App = () => {
  const android_CLIENT_ID = '383019829097-gs951k3jsnm51kds70j7boohhc1tp961.apps.googleusercontent.com';

  return (
    <SafeAreaView>
      {/* <Splash/> */}
      <SignUp/>
    </SafeAreaView>
  );
}

export default App