import React, { Component } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
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
		controls: {
			placeName: {
				value: '',
				valid: false,
				touched: false,
				validationRules: {
					notEmpty: true
				}
			},
			location: {
				value: null,
				valid: false
			}
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
				controls: {
					...prevState.controls,
					placeName: {
						value: val,
						touched: true,
						valid: validation(val, prevState.controls.placeName.validationRules)
					}
				}
			};
		});
	};

	locationPickedHandler = (location) => {
		this.setState((prevState) => {
			return {
				controls: {
					...prevState.controls,
					location: {
						value: location,
						valid: true
					}
				}
			};
		});
	};

	placeAddedHandler = () => {
		this.props.onAddPlace(this.state.controls.placeName.value, this.state.controls.location.value);
	};

	render() {
		return (
			<View behavior={'padding'} style={styles.container}>
				<KeyboardAwareScrollView>
					<MainText>
						<HeadingText style={{ alignItems: 'center' }}>Share a place with us!</HeadingText>
					</MainText>
					<View>
						<PickImage />
						<PickLocation onLocationPick={this.locationPickedHandler} />
					</View>
					<View style={styles.placeInput}>
						<PlaceInput
							/* placeName has all the controls placeData is intrested in */
							placeData={this.state.controls.placeName}
							onChangeText={this.placeNameChangedHandler}
						/>
					</View>
					<View style={styles.button}>
						<Button
							disabled={!this.state.controls.placeName.valid || !this.state.controls.location.valid}
							title="Share the Place"
							onPress={this.placeAddedHandler}
						/>
					</View>
				</KeyboardAwareScrollView>
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
		onAddPlace: (placeName, location) => dispatch(addPlace(placeName, location))
	};
};

export default connect(null, mapDispatchToProps)(SharePlaceScreen);
