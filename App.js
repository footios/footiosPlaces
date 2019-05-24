import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';

import AuthScreen from './src/screens/Auth/Auth';
import SharePlaceScreen from './src/screens/SharePlace/SharePlace';
import FindPlaceScreen from './src/screens/FindPlace/FindPlace';
import PlaceDetailScreen from './src/screens/PlaceDetail/PlaceDetail';
import configureStore from './src/store/configureStore';
import SideDrawer from './src/screens/SideDrawer/SideDrawer';

const store = configureStore();

// Here we're going to
// 1. register screens and
// 2. start the app

// Register Screens
// Note: We load screens which we registered in advance by an ID!
// You have to register a component before you load it with RNN
Navigation.registerComponent('footios-places.AuthScreen', () => AuthScreen, store, Provider);
Navigation.registerComponent('footios-places.SharePlaceScreen', () => SharePlaceScreen, store, Provider);
Navigation.registerComponent('footios-places.FindPlaceScreen', () => FindPlaceScreen, store, Provider);
Navigation.registerComponent('footios-places.PlaceDetailScreen', () => PlaceDetailScreen, store, Provider);
Navigation.registerComponent('footios-places.SideDrawer', () => SideDrawer, store, Provider);

// Start an App
 export default () => Navigation.startSingleScreenApp({
	screen: {
		screen: 'footios-places.AuthScreen',
		title: 'Login'
	}
});
