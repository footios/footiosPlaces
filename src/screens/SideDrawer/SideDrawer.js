import React, { Component } from 'react';
import { View, Text, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'

import HeadingText from '../../components/UI/HeadingText/HeadingText'

class SideDrawer extends Component {
	render() {
		return (
			<View style={[styles.container, {width: Dimensions.get('window').width * 0.8}]} >
				<View style={styles.title} >
				<View style={styles.sideDraweIcon}  >
					<Icon size={30} name='ios-list-box' color='black' />
				</View>
					<HeadingText>SideDrawer</HeadingText>
				</View>
				<View style={styles.logout} >
					<Text style={{fontSize: 20}} >Log out</Text>
				<TouchableOpacity onPress={() => alert('You are logged out')} >
				<View style={styles.logoutIcon}  >
					<Icon size={30} name='ios-log-out' color='black' />
				</View>
				</TouchableOpacity>
				</View>
			</View>
		);
	}
}

// needed for android
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 22,
		backgroundColor: 'white',
		justifyContent: 'space-between',
	},
	title: {
		margin: 25,
		flexDirection: 'row'
	},
	sideDraweIcon: {
		margin: 3,
		marginRight: 5,
	},
	logout: {
		marginBottom: 355,
		marginLeft: 30,
		flexDirection: 'row',
		alignItems: 'center',
		fontSize: 30
	},
	logoutIcon: {
		margin: 3,
		marginLeft: 15,
	}
})

export default SideDrawer;
