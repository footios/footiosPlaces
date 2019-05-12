import React, { Component } from 'react';
import { View, Button, StyleSheet, ScrollView, KeyboardAvoidingView } from 'react-native';
import { connect } from 'react-redux';

import { addPlace } from '../../store/actions/index';
import PlaceInput from '../../components/PlaceInput/PlaceInput';
import MainText from '../../components/UI/MainText/MainText';
import HeadingText from '../../components/UI/HeadingText/HeadingText';
import PickImage from '../../components/PickImage/PickImage';
import PickLocation from '../../components/PickLocation/PickLocation';

import validation from '../../utility/validation';

class SharePlaceScreen extends Component {
	static navigatorStyle = {
		navBarButtonColor: 'orange'
	};
	state = {
		placeName: '',
		valid: false,
		touched: false,
		validationRules: {
			string: 'string'
		}
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
		this.setState((prevState) => {
			return {
				...prevState,
				placeName: val,
				touched: true,
				valid: validation(val, this.state.validationRules)
			};
		});
	};

	placeAddedHandler = () => {
		if (this.state.placeName.trim() !== '') {
			this.props.onAddPlace(this.state.placeName);
		}
	};

	render() {
		return (
			<KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
				<ScrollView style={[styles.scrollViewStyle, {backgroundColor: 'transparent'}]}>
					<View style={{ flex: 1 }}>
						<MainText>
							<HeadingText>Share a place with us!</HeadingText>
						</MainText>
						<View>
							<PickImage />
							<PickLocation />
						</View>
						<View style={styles.placeInput}>
							<PlaceInput
								valid={this.state.valid}
								touched={this.state.touched}
								placeName={this.state.placeName}
								onChangeText={this.placeNameChangedHandler}
							/>
						</View>
						<View style={styles.button}>
							<Button
								disabled={!this.state.valid}
								title="Share the Place"
								onPress={this.placeAddedHandler}
							/>
						</View>
					</View>
				</ScrollView>
			</KeyboardAvoidingView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		// position: 'relative' // for scroll to not snap back, but not working
	},
	button: {
		margin: 8
	},
	placeInput: {
		width: 300,
		alignItems: 'center',
		// justifyContent: 'center'
		
	},
	// scrollViewStyle: { // for scroll to not snap back, but not working
	// 	position: 'absolute',
	// 	top: 0,
	// 	left: 0,
	// 	right: 0,
	// 	bottom: 0,
	// },
});

const mapDispatchToProps = (dispatch) => {
	return {
		onAddPlace: (placeName) => dispatch(addPlace(placeName))
	};
};

export default connect(null, mapDispatchToProps)(SharePlaceScreen);
