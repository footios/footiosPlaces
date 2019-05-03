import React, { Component } from 'react'
import { View, Text, Button } from 'react-native'
import startMainTabs from '../MainTabs/startMainTabs'

/* Screens are components we load through RNNavigation (instead of Router)! */

class AuthScreen extends Component {

    loginHandler = () => {
        startMainTabs();
    }
    
    render() { 
        return ( 
           <View>
               <Text>Auth Screen</Text>
               <Button title='Login' onPress={this.loginHandler} ></Button>
           </View> 
         );
    }
}
 
export default AuthScreen;