import { Navigation } from 'react-native-navigation';

import AuthScreen from './src/screens/Auth/Auth';
import SharePlaceScreen from './src/screens/SharePlace/SharePlace';
import FindPlaceScreen from './src/screens/FindPlace/FindPlace'

// Here we're going to 
// 1. register screens and
// 2. start the app

// Registe Screens
// Note: We load screens which we registered in advance by an ID!
// You have to register a component before you load it with RNN
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