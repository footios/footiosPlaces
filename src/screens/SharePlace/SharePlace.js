import React, { Component } from 'react';
import { View, Button, StyleSheet, ScrollView } from 'react-native';
import { connect } from 'react-redux';

import { addPlace } from '../../store/actions/index';
import PlaceInput from '../../components/PlaceInput/PlaceInput';
import MainText from '../../components/UI/MainText/MainText';
import HeadingText from '../../components/UI/HeadingText/HeadingText';
import PickImage from '../../components/PickImage/PickImage';
import PickLocation from '../../components/PickLocation/PickLocation';

class SharePlaceScreen extends Component {
	state = {
		placeName: ''
	};
	constructor(props) {
		super(props);
		// setOnNavigatorEvent: here we specify a method that should be executed
		// every time an event occurs.
		this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
	}

	// above in the constructor, we don't need to bind.`this`
	// like this: this.onNavigatorEvent.bind(this)
	// because we use here an arrow func.
	onNavigatorEvent = (event) => {
		//console.log(event);
		if (event.type === 'NavBarButtonPress') {
			if (event.id === 'sideDrawerToggle') {
				this.props.navigator.toggleDrawer({
					side: 'left'
				});
			}
		}
	};

	placeNameChangedHandler = (val) => {
		this.setState({
			placeName: val
		});
	};

	placeAddedHandler = () => {
		if (this.state.placeName.trim() !== '') {
			this.props.onAddPlace(this.state.placeName);
		}
	};

	render() {
		return (
			<View style={styles.container}>
				<ScrollView>
					<MainText>
						<HeadingText>Share a place with us!</HeadingText>
					</MainText>
					<View >
					<PickImage />
					<PickLocation />
					</View>
					<View style={styles.placeInput} >
					<PlaceInput placeName={this.state.placeName} onChangeText={this.placeNameChangedHandler} />
					</View>
					<View style={styles.button}>
						<Button title="Share the Place" onPress={this.placeAddedHandler} />
					</View>
				</ScrollView>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center'
	},
	button: {
		margin: 8
	},
	placeInput: {
		width: 300,
		alignItems: 'center'
	}
});

const mapDispatchToProps = (dispatch) => {
	return {
		onAddPlace: (placeName) => dispatch(addPlace(placeName))
	};
};

export default connect(null, mapDispatchToProps)(SharePlaceScreen);
