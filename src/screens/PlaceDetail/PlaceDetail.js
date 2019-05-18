import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import { View, Image, Text, StyleSheet, TouchableOpacity, Platform, Dimensions } from 'react-native';
import MapView from 'react-native-maps';

import { deletePlace } from '../../store/actions/index';
import { getPlaces } from '../../store/actions';

// gets pushed from FindPlace
class PlaceDetail extends Component {
	state = {
		viewMode: Dimensions.get('window').height > 500 ? 'portrait' : 'landscape'
	};
	constructor(props) {
		super(props);
		Dimensions.addEventListener('change', this.updateStyles);
	}
	// for avoiding memory leaks
	componentWillUnmount() {
		Dimensions.removeEventListener('change', this.updateStyles);
	}

	updateStyles = (dms) => {
		this.setState({
			viewMode: dms.window.height > 500 ? 'portrait' : 'landscape'
		});
	};
	placeDeleteHandler = () => {
		// selectedPlace: is props we pushed from FindPlace
		this.props.onDeletePlace(this.props.selectedPlace.key);
		this.props.onLoadPlaces();
		this.props.navigator.pop();
	};

	render() {
		return (
			<View style={{flex: 1}} >
				<View
					style={[
						styles.container,
						this.state.viewMode === 'portrait' ? styles.portraitContainer : styles.landscapeContainer
					]}
				>
					{this.state.viewMode === 'portrait' ? (
						<View style={styles.nameAndTrushIconPortrait}>
							<Text style={styles.placeName}>{this.props.selectedPlace.name}</Text>
							<TouchableOpacity onPress={this.placeDeleteHandler}>
								<View style={styles.deleteButton}>
									<Icon
										size={30}
										name={Platform.OS === 'android' ? 'md-trash' : 'ios-trash'}
										color="red"
									/>
								</View>
							</TouchableOpacity>
						</View>
					) : null}
					<Image
						source={this.props.selectedPlace.image}
						style={
							this.state.viewMode === 'portrait' ? styles.placeImagePortrait : styles.placeImageLandscape
						}
					/>
					<MapView
						initialRegion={{
							...this.props.selectedPlace.location,
							latitudeDelta: 0.0122,
							longitudeDelta: Dimensions.get('window').width / Dimensions.get('window').height * 0.0122
						}}
						style={this.state.viewMode === 'portrait' ? styles.mapPortrait : styles.mapLandscape}
					>
						<MapView.Marker coordinate={this.props.selectedPlace.location} />
					</MapView>
				</View>
				{this.state.viewMode === 'landscape' ? (
					<View style={styles.nameAndTrushIconLandscape}>
						<Text style={styles.placeName}>{this.props.selectedPlace.name}</Text>
						<TouchableOpacity onPress={this.placeDeleteHandler}>
							<View style={styles.deleteButton}>
								<Icon
									size={30}
									name={Platform.OS === 'android' ? 'md-trash' : 'ios-trash'}
									color="red"
								/>
							</View>
						</TouchableOpacity>
					</View>
				) : null}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		margin: 50,
		flex: 1
	},
	portraitContainer: {
		flexDirection: 'column'
	},
	landscapeContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	placeImagePortrait: {
		width: '100%',
		height: 200
	},
	placeImageLandscape: {
		flex: 1,
		width: '50%',
		height: 200
	},
	placeName: {
		fontWeight: 'bold',
		textAlign: 'center',
		fontSize: 28
	},
	nameAndTrushIconPortrait: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between'
	},
	nameAndTrushIconLandscape: {
		flexDirection: 'row',
		alignItems: 'flex-end',
		justifyContent: 'space-around'
	},
	deleteButton: {
		alignItems: 'center'
	},
	mapPortrait: {
		width: '100%',
		height: 250
	},
	mapLandscape: {
		flex: 1,
		width: '50%',
		height: 200
	}
});

const mapDispatchToProps = (dispatch) => {
	return {
		onDeletePlace: (key) => dispatch(deletePlace(key)),
		onLoadPlaces: () => dispatch(getPlaces())
	};
};

export default connect(null, mapDispatchToProps)(PlaceDetail);
