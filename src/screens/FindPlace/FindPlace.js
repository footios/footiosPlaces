import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { connect } from 'react-redux';

import PlaceList from '../../components/PlaceList/PlaceList';

class FindPlace extends Component {
	static navigatorStyle = {
		navBarButtonColor: 'orange'
	}
	state = {
		placesLoaded: false,
	}
    constructor(props) {
		super(props);
		// setOnNavigatorEvent: here we specify a meth that should be executed
		// every time an event occurs.
		this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent)
	}

	// above in the constructor, we don't need to bind.`this`
	// because we use here an arrow func.
	// like this: this.onNavigatorEvent.bind(this)
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
	placesSearchHandler = () => {
	this.setState({
		placesLoaded: true
	})
	}
 
	itemSelectedHandler = (key) => {
		const selPlace = this.props.places.find((place) => {
			return place.key === key;
		});
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
			<TouchableOpacity onPress={this.placesSearchHandler} >
				<View style={styles.searchButton} >
					<Text style={styles.searchButtonText} >Find Places</Text>
				</View>
			</TouchableOpacity>
		)
		if (this.state.placesLoaded) {
			content = (
				<View>
				<PlaceList places={this.props.places} onItemSelected={this.itemSelectedHandler} />
			  </View>
			)
		}
		return (
			<View style={this.state.placesLoaded ? null : styles.buttonContainer} >
				{content}
			</View>
		)
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
})
const mapStateToProps = (state) => {
	return {
		places: state.places.places
	};
};

export default connect(mapStateToProps)(FindPlace);
