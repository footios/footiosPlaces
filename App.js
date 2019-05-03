import { Navigation } from 'react-native-navigation';

import AuthScreen from './src/screens/Auth/Auth';
import SharePlaceScreen from './src/screens/SharePlace/SharePlace';
import FindPlaceScreen from './src/screens/FindPlace/FindPlace'

// Here we're going to register screens and
// start the app

// Registe Screens
// Note: We load screens which we registered in advance by an ID.
Navigation.registerComponent('footios-places.AuthScreen', () => AuthScreen);
Navigation.registerComponent('footios-places.SharePlaceScreen', () => SharePlaceScreen)
Navigation.registerComponent('footios-places.FindPlaceScreen', () => FindPlaceScreen)

// Start an App
Navigation.startSingleScreenApp({
  screen: {
    screen: 'footios-places.AuthScreen',
    title: 'Login'
  }
})