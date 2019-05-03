import { Navigation } from 'react-native-navigation';

const startTabs = () => {
    Navigation.startTabBasedApp({
        tabs: [
            {
                screen: 'footios-places.FindPlaceScreen',
                label: 'Find Place',
                title: 'Find Place'
            },
            {
                screen: 'footios-places.SharePlaceScreen',
                label: 'Share Place',
                title: 'Share Place'
            },
        ]
    })
}

export default startTabs;
