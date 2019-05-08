import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import { View, Image, Text, StyleSheet, TouchableOpacity, Platform, ImageBackground } from 'react-native';

import { deletePlace } from '../../store/actions/index';

class PlaceDetail extends Component {

	placeDeleteHandler = () => {
		// selectedPlace: is props we pushed from FindPlace
		this.props.onDeletePlace(this.props.selectedPlace.key);
		this.props.navigator.pop();
	}

	render(){
		return (
			<View style={styles.container}>
				<ImageBackground source={this.props.selectedPlace.image} style={styles.placeImage} >
				<TouchableOpacity onPress={this.placeDeleteHandler}>
					<View style={styles.deleteButtonAndName}>
						<Text style={styles.placeName}>{this.props.selectedPlace.name}</Text>
						<Icon size={30} name={Platform.OS ==='android' ? "md-close" : "ios-close"} color="black" />
					</View>
				</TouchableOpacity>
				</ImageBackground>
			</View>
		);
	}
	
};

const styles = StyleSheet.create({
	container: {
		margin: 22
	},
	placeImage: {
		width: '100%',
		height: 200
	},
	placeName: {
		fontWeight: 'bold',
		textAlign: 'center',
		fontSize: 28
	},
	deleteButtonAndName: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'stretch',
	}
});

const mapDispatchToProps = dispatch => {
	return {
		onDeletePlace: key => dispatch(deletePlace(key))
	}
}

export default connect(null, mapDispatchToProps)(PlaceDetail);
