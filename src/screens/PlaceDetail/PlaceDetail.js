import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import { View, Image, Text, StyleSheet, TouchableOpacity, Platform, Dimensions } from 'react-native';

import { deletePlace } from '../../store/actions/index';

class PlaceDetail extends Component {
	state = {
		viewMode: Dimensions.get('window').height > 500 ? 'portrait' : 'landscape'
	};

	constructor(props) {
		super(props);
		Dimensions.addEventListener('change', this.updateStyles);
	}

	componentWillUnmount() {
		Dimensions.removeEventListener('change', this.updateStyles);
	}

	updateStyles = (dims) => {
		this.setState({
			viewMode: dims.window.height > 500 ? 'portrait' : 'landscape'
		});
	};

	placeDeleteHandler = () => {
		// selectedPlace: is props we pushed from FindPlace
		this.props.onDeletePlace(this.props.selectedPlace.key);
		this.props.navigator.pop();
	};

	render() {
		return (
			<View style={styles.container}>
				<View style={this.state.viewMode === 'landscape' ? styles.viewImageLandScape : null}>
					<Image
						source={this.props.selectedPlace.image}
						style={
							this.state.viewMode === 'portrait' ? styles.placeImagePortrait : styles.placeImageLanscape
						}
					/>
				</View>
				<View style={this.state.viewMode === 'landscape' ? styles.nameAndIcon : null}>
					<Text style={styles.placeName}>{this.props.selectedPlace.name}</Text>
					<TouchableOpacity onPress={this.placeDeleteHandler}>
						<View style={styles.deleteButton}>
							<Icon size={30} name={Platform.OS === 'android' ? 'md-trash' : 'ios-trash'} color="red" />
						</View>
					</TouchableOpacity>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({ 
	container: {
		margin: 22
	},
	nameAndIcon: {
		flexDirection: 'row',
		justifyContent: 'space-evenly'
	},
	placeImagePortrait: {
		width: '100%',
		height: 200
	},
	viewImageLandScape: {
		justifyContent: 'center',
		alignItems: 'center'
	},
	placeImageLanscape: {
		width: '50%',
		height: 200
	},
	placeName: {
		fontWeight: 'bold',
		textAlign: 'center',
		fontSize: 28
	},
	deleteButton: {
		alignItems: 'center'
	}
});

const mapDispatchToProps = (dispatch) => {
	return {
		onDeletePlace: (key) => dispatch(deletePlace(key))
	};
};

export default connect(null, mapDispatchToProps)(PlaceDetail);
