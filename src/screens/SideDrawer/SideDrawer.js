import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, Dimensions, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import { authLogout } from "../../store/actions"

class SideDrawer extends Component {
logoutHandler = () => {
	this.props.onLogout()
}
	render() {
		return (
			<View style={[styles.container, {width: Dimensions.get('window').width * 0.8}]} >
			<TouchableOpacity onPress={this.logoutHandler} >
			<View style={styles.drawerItem} >
				<Icon style={styles.drawerItem} 
				name={Platform.OS === 'android' ? 'md-log-out' : 'ios-log-out'} size={30} color='#bbb' />
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

const mapDispatchToProps = dispatch => {
	return {
		onLogout: () => dispatch(authLogout())
	}
}

export default connect(null, mapDispatchToProps)(SideDrawer);
