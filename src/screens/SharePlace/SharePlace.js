import React, { Component } from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';
import { connect } from 'react-redux';

import { addPlace } from '../../store/actions/index';
import DefaultInput from '../../components/UI/DefaultInput/DefaultInput';
import PlacePreview from '../../components/PlacePreview/PlacePreview';


class SharePlaceScreen extends Component {
	constructor(props) {
		super(props);
	
		// setOnNavigatorEvent: here we specify a method that should be executed
		// every time an event occurs.
		this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
	}
	state = {
		placeName: ''
	};

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

	placeAddedHandler = () => {
		if (this.state.placeName.trim() === '') {
			return;
		}
		this.props.onAddPlace(this.state.placeName);
	};

	placeNameChangedHandler = (val) => {
		this.setState({
			placeName: val
		});
	};

	render() {
		return (
			<View style={styles.container}>
				<ScrollView>
					<PlacePreview />
					<View style={styles.placeholder}>
						<Text>Map</Text>
					</View>
					<View style={styles.button}>
						<Button title="Locate Me" />
					</View>
					<DefaultInput
						placeholder="Place name"
						value={this.state.placeName}
						onChangeText={this.placeNameChangedHandler}
					/>
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
	placeholder: {
		borderWidth: 1,
		borderColor: 'black',
		backgroundColor: '#eee',
		width: '80%',
		height: 150
	},
	button: {
		margin: 8
	},
	previewImage: {
		width: '100%',
		height: '100%'
	}
});

const mapDispatchToProps = (dispatch) => {
	return {
		onAddPlace: (placeName) => dispatch(addPlace(placeName))
	};
};

export default connect(null, mapDispatchToProps)(SharePlaceScreen);
