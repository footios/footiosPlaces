import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import PlaceInput from '../../components/PlaceInput/PlaceInput';
import { addPlace } from '../../store/actions/index';

class SharePlaceScreen extends Component {
	constructor(props) {
		super(props);
		// setOnNavigatorEvent: here we specify a method that should be executed
		// every time an event occurs.
		this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent)
	}

	// above in the constructor, we don't need to bind.`this`
	// like this: this.onNavigatorEvent.bind(this)
	// because we use here an arrow func.
	onNavigatorEvent = event => {
		//console.log(event);
		if (event.type === 'NavBarButtonPress'){
			if (event.id === 'sideDrawerToggle'){
				this.props.navigator.toggleDrawer({
					side: 'left' 
				})
			}
		}
	}
 
	placeAddedHandler = (placeName) => {
		this.props.onAddPlace(placeName);
	};

	render() {
		return (
			<View>
				<PlaceInput onPlaceAdded={this.placeAddedHandler} />
			</View>
		);
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		onAddPlace: (placeName) => dispatch(addPlace(placeName))
	};
};

export default connect(null, mapDispatchToProps)(SharePlaceScreen);
