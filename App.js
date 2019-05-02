import { Navigation } from 'react-native-navigation';

import AuthScreen from './src/screens/Auth/Auth';

// Here we're going to register screens and
// start the app

// Registe Screens
// Note: We load screens which we registered in advance by an ID.
Navigation.registerComponent('footios-places.AuthScreen', () => AuthScreen);

// Start an App
Navigation.startSingleScreenApp({
  screen: {
    screen: 'footios-places.AuthScreen',
    title: 'Login'
  }
})