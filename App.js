import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';

import AuthScreen from './src/screens/Auth/Auth';
import SharePlaceScreen from './src/screens/SharePlace/SharePlace';
import FindPlaceScreen from './src/screens/FindPlace/FindPlace';
import configureStore from './src/store/configureStore';

const store = configureStore();

// Here we're going to
// 1. register screens and
// 2. start the app

// Registe Screens
// Note: We load screens which we registered in advance by an ID!
// You have to register a component before you load it with RNN
Navigation.registerComponent('footios-places.AuthScreen', () => AuthScreen, store, Provider);
Navigation.registerComponent('footios-places.SharePlaceScreen', () => SharePlaceScreen, store, Provider);
Navigation.registerComponent('footios-places.FindPlaceScreen', () => FindPlaceScreen, store, Provider);

// Start an App
Navigation.startSingleScreenApp({
	screen: {
		screen: 'footios-places.AuthScreen',
		title: 'Login'
	}
});
