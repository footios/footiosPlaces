import React, { Component } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

class PickLocation extends Component {
	state = {};
	render() {
		return (
			<View >
				<View style={styles.placeholder}>
					<Text>Map</Text>
				</View>
				<View style={styles.button}>
					<Button title="Locate Me" onPress={() => alert('pick location')} />
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
        // width: '100%',
        // alignItems: 'center'
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
});

export default PickLocation;
