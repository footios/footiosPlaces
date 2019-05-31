import React, { Component } from 'react';
import { View, Image, Button, StyleSheet } from 'react-native';
import ImagePicker from 'react-native-image-picker'

class PickImage extends Component {
	state = {
		pickedImage: null
	};

	reset = () => {
		this.setState({
			pickedImage: null
		})
	}

	pickedImageHandler = () => {
		/* if you don't need base64...(the image as a string, so you can send it over the internet) 
		you can set
		title: 'Pick an Image', noData: true
		to improve performance */
		const options = {
			title: 'Pick an Image',
			// Very important!
			// maxWidth and maxHeigth are set to 30 (very small)
			// because we cannot upload imgs larger than 10mb.
			// maxWidth: 600, 
			// maxHeight: 800,
			/* Actually it's not needed. 
			We added `resumable: false`, 
			to the cloud function (and run `firebase deploy`
			because we modified the cloud function). 
			So now the app can upload big images.
			But, we can keep the maxWidth..., just to avoid the 
			long waiting loading time.*/
		  };

		ImagePicker.showImagePicker(options, res => {
			if (res.didCancel){
				console.log('User cancelled');
			} else if (res.error){
				console.log('Error', res.error);
			} else {
				this.setState({
					pickedImage: {uri: res.uri}
				})
				this.props.onImagePicked({uri: res.uri, base64: res.data})
			}
		})
	}
	render() {
		return (
			<View style={{alignItems:'center'}} >
				<View style={styles.placeholder}>
					<Image style={styles.previewImage} source={this.state.pickedImage} />
				</View>
				<View style={styles.button}>
					<Button title="Pick Image" onPress={this.pickedImageHandler} />
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
        width: '100%',
        alignItems: 'center'
	},
	placeholder: {
		borderWidth: 1,
		borderColor: 'black',
		backgroundColor: '#eee',
		width: '80%',
		height: 150,
	},
	button: {
		margin: 8
	},
	previewImage: {
		width: '100%',
		height: '100%'
	}
});

export default PickImage;

