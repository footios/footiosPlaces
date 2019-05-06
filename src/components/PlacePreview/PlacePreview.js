import React from 'react';
import { View, Button, StyleSheet, Image } from 'react-native';

import MainText from '../../components/UI/MainText/MainText'
import HeadingText from '../../components/UI/HeadingText/HeadingText';
import imagePlaceholder from '../../assets/beautiful-place.jpg'

const placePreview = (props) => {
	return (
		<View>
			<MainText>
				<HeadingText>Share a place with us!</HeadingText>
			</MainText>
			<View style={styles.placeholder}>
				<Image style={styles.previewImage} source={imagePlaceholder} />
			</View>
			<View style={styles.button}>
				<Button title="Pick Image" />
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	placeholder: {
		borderWidth: 1,
		borderColor: 'black',
		backgroundColor: '#eee',
		width: '80%',
		height: 150
	},
	button: {
		margin: 8,
	},
	previewImage: {
		width: '100%',
		height: '100%'
	}
});


export default placePreview;
