import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { connect } from 'react-redux';

import PlaceList from '../../components/PlaceList/PlaceList';
import { getPlaces } from '../../store/actions';

class FindPlace extends Component {
	static navigatorStyle = {
		navBarButtonColor: 'orange'
	};
	state = {
		placesLoaded: false,
		removeAnim: new Animated.Value(1),
		placesAnim: new Animated.Value(0)
	};
	constructor(props) {
		super(props);
		// setOnNavigatorEvent: here we specify a meth that should be executed
		// every time an event occurs.
		this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
	}

	
	// componentWillReceiveProps(nextProps) {
	// 	if (nextProps.places !== this.props.places) {
	// 		this.props.onLoadPlaces();
	// 	}
	// }
	
	// componentDidUpdate(prevProps, prevState) {
	// 		if (prevProps.places !== this.props.places) {
	// 		this.props.onLoadPlaces();
	// 	}
	// }

	// above in the constructor, we don't need to bind.`this`
	// because we use here an arrow func.
	// like this: this.onNavigatorEvent.bind(this)
	onNavigatorEvent = (event) => {
		//console.log(event);
		if (event.type === 'ScreenChangedEvent') {
			if (event.id === 'willAppear') {
				this.props.onLoadPlaces();
			}
		}
		if (event.type === 'NavBarButtonPress') {
			if (event.id === 'sideDrawerToggle') {
				this.props.navigator.toggleDrawer({
					side: 'left'
				});
			}
		}
	};

	placesLoadedHandler = () => {
		Animated.timing(this.state.placesAnim, {
			toValue: 1,
			duration: 500,
			useNativeDriver: true
		}).start();
	};

	placesSearchHandler = () => {
		Animated.timing(this.state.removeAnim, {
			toValue: 0,
			duration: 500,
			useNativeDriver: true
		}).start(() => {
			this.setState({ placesLoaded: true });
			this.placesLoadedHandler();
		});
	};

	itemSelectedHandler = (key) => {
		const selPlace = this.props.places.find((place) => {
			return place.key === key;
		});
		console.log(selPlace);
		this.props.navigator.push({
			screen: 'footios-places.PlaceDetailScreen',
			title: selPlace.name,
			passProps: {
				selectedPlace: selPlace
			}
		});
	};
	render() {
		let content = (
			<Animated.View
				style={{
					opacity: this.state.removeAnim,
					transform: [
						{
							scale: this.state.removeAnim.interpolate({
								inputRange: [ 0, 1 ],
								outputRange: [ 12, 1 ]
							})
						}
					]
				}}
			>
				<TouchableOpacity onPress={this.placesSearchHandler}>
					<View style={styles.searchButton}>
						<Text style={styles.searchButtonText}>Find Places</Text>
					</View>
				</TouchableOpacity>
			</Animated.View>
		);
		if (this.state.placesLoaded) {
			content = (
				<Animated.View
					style={{
						opacity: this.state.placesAnim
					}}
				>
					<PlaceList places={this.props.places} onItemSelected={this.itemSelectedHandler} />
				</Animated.View>
			);
		}
		return <View style={this.state.placesLoaded ? null : styles.buttonContainer}>{content}</View>;
	}
}

const styles = StyleSheet.create({
	buttonContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	searchButton: {
		borderColor: 'orange',
		borderWidth: 3,
		borderRadius: 50,
		padding: 20
	},
	searchButtonText: {
		color: 'orange',
		fontWeight: 'bold',
		fontSize: 26
	}
});
const mapStateToProps = (state) => {
	return {
		places: state.places.places
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onLoadPlaces: () => dispatch(getPlaces())
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(FindPlace);
