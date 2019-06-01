import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import { View, Image, Text, StyleSheet, TouchableOpacity, Platform, Dimensions } from 'react-native';
import MapView from 'react-native-maps';
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
	listenOrientationChange as loc,
	removeOrientationListener as rol
  } from 'react-native-responsive-screen';

import { deletePlace } from '../../store/actions/index';

// gets pushed from FindPlace
class PlaceDetail extends Component {
	state = {
		viewMode: Dimensions.get('window').height > Dimensions.get('window').width ? 'portrait' : 'landscape'
	};
	constructor(props) {
		super(props);
		Dimensions.addEventListener('change', this.updateStyles);
	}
	componentDidMount() {
		loc(this);
	  }
	
	// for avoiding memory leaks
	componentWillUnmount() {
		rol();
		Dimensions.removeEventListener('change', this.updateStyles);
	}

	updateStyles = (dms) => {
		this.setState({
			viewMode: dms.window.height > dms.window.width ? 'portrait' : 'landscape'
		});
	};
	placeDeleteHandler = () => {
		// selectedPlace: is props we pushed from FindPlace
		this.props.onDeletePlace(this.props.selectedPlace.key);
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
							{/* <Text style={styles.placeName}>{this.props.selectedPlace.name}</Text> */}
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
						{/* <Text style={styles.placeName}>{this.props.selectedPlace.name}</Text> */}
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
		// margin: 50,
		flex: 1
	},
	portraitContainer: {
		flexDirection: 'column'
	},
	landscapeContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'flex-start',
	},
	placeImagePortrait: {
		width: wp('100%'),
		height: hp('40%')
	},
	placeImageLandscape: {
		flex: 1,
		width: wp('45%'),
		height: hp('50%')
	},
	placeName: {
		fontWeight: 'bold',
		textAlign: 'center',
		fontSize: hp('5%')
	},
	nameAndTrushIconPortrait: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center'
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
		width: wp('100%'),
		height: hp('40%')
	},
	mapLandscape: {
		flex: 1,
		width: wp('45%'),
		height: hp('50%')
	}
});

const mapDispatchToProps = (dispatch) => {
	return {
		onDeletePlace: (key) => dispatch(deletePlace(key))
	};
};

export default connect(null, mapDispatchToProps)(PlaceDetail);
