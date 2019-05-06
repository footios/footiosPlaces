import React, { Component } from 'react';
import { View, Button, StyleSheet, ImageBackground } from 'react-native';

import startMainTabs from '../MainTabs/startMainTabs';
import DefaultInput from '../../components/UI/DefaultInput/DefaultInput';
import HeadingText from '../../components/UI/HeadingText/HeadingText';
import MainText from '../../components/UI/MainText/MainText';
import backgroundImage from '../../assets/background.jpg';
import ButtondWithBackground from '../../components/UI/ButtonWithBackground/ButtonWithBackground' 

/* Screens are components we load through RNNavigation (instead of Router)! */

class AuthScreen extends Component {
	loginHandler = () => {
		startMainTabs();
	};

	render() {
		return (
			<ImageBackground style={styles.backgroundImage} source={backgroundImage}>
				<View style={styles.container}>
					<MainText>
						<HeadingText>Please Log in</HeadingText>
					</MainText>
					<ButtondWithBackground color='#29aaf4' onPress={() => alert('hello world')} >Switch to Login</ButtondWithBackground>
					<View style={styles.inputContainer}>
						<DefaultInput placeholder="Your e-mail adress" style={styles.input} />
						<DefaultInput placeholder="Password" style={styles.input} />
						<DefaultInput placeholder="Confirm password" style={styles.input} />
					</View>
					<ButtondWithBackground color='#29aaf4' onPress={this.loginHandler}>Submit</ButtondWithBackground>
				</View>
			</ImageBackground>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	backgroundImage: {
        width: '100%',
        flex: 1
	},
	inputContainer: {
		width: '80%'
	},
	input: {
		backgroundColor: '#eee',
		borderColor: '#bbb'
	}
});

export default AuthScreen;
