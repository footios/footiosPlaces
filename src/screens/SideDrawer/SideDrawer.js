import React, { Component } from 'react';
import { View, Text, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'

class SideDrawer extends Component {
	render() {
		return (
			<View style={[styles.container, {width: Dimensions.get('window').width * 0.8}]} >
			<TouchableOpacity onPress={() => alert('You are signed out!') } >
			<View style={styles.drawerItem} >
				<Icon style={styles.drawerItem} name='ios-log-out' size={30} color='#bbb' />
				<Text>Sign out</Text>
			</View>
			</TouchableOpacity>
			</View>
		);
	}
}

// needed for android
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 30,
        backgroundColor: 'white',
	}, 
	drawerItem: {
		flexDirection: 'row',
		alignItems: 'center',
		padding: 10,
		backgroundColor: '#eee'
	},
	drawerItemIcon: {
		marginRight: 10
	}
})

export default SideDrawer;
