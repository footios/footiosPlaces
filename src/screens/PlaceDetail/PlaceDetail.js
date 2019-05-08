import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import { View, Dimensions, Text, StyleSheet, TouchableOpacity, Platform, ImageBackground } from 'react-native';

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
					<ImageBackground
						source={this.props.selectedPlace.image}
						style={
							this.state.viewMode === 'portrait' ? styles.placeImagePortrait : styles.placeImageLanscape
						}
					>
						<TouchableOpacity onPress={this.placeDeleteHandler}>
							<View style={styles.nameAndIcon}>
								<Text style={styles.placeName}>{this.props.selectedPlace.name}</Text>
								<Icon
									size={30}
									name={Platform.OS === 'android' ? 'md-close' : 'ios-close'}
									color="red"
								/>
							</View>
						</TouchableOpacity>
					</ImageBackground>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		margin: 22
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
		width: 500,
		height: 200
	},
	placeName: {
		fontWeight: 'bold',
		textAlign: 'center',
		fontSize: 28,
		color: 'white'
	},
	nameAndIcon: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		margin: 2,
		padding: 2
	}
});

const mapDispatchToProps = (dispatch) => {
	return {
		onDeletePlace: (key) => dispatch(deletePlace(key))
	};
};

export default connect(null, mapDispatchToProps)(PlaceDetail);
