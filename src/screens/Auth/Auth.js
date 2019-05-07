import React, { Component } from 'react';
import { View, Dimensions, StyleSheet, ImageBackground } from 'react-native';

import startMainTabs from '../MainTabs/startMainTabs';
import DefaultInput from '../../components/UI/DefaultInput/DefaultInput';
import HeadingText from '../../components/UI/HeadingText/HeadingText';
import MainText from '../../components/UI/MainText/MainText';
import backgroundImage from '../../assets/background.jpg';
import ButtondWithBackground from '../../components/UI/ButtonWithBackground/ButtonWithBackground';

/* Screens are components we load through RNNavigation (instead of Router)! */

class AuthScreen extends Component {
	constructor(props) {
		super(props);
	
		this.state = {
		  height: Dimensions.get('window').height,
		}
	
		this.onLayout = this.onLayout.bind(this);
	
	  }
	  onLayout(e) {
		this.setState({
		  height: Dimensions.get('window').height
		});
	  }

	loginHandler = () => {
		startMainTabs();
	};

	render() {
		let headingText = null;
		if (this.state.height > 500) {
			headingText = (
				<MainText>
					<HeadingText>Please Log in</HeadingText>
				</MainText>
			);
		}
		return (
			<ImageBackground style={styles.backgroundImage} source={backgroundImage}>
				<View onLayout={this.onLayout} style={styles.container}>
					{headingText}
					<ButtondWithBackground color="#29aaf4" onPress={() => alert('hello world')}>
						Switch to Login
					</ButtondWithBackground>
					<View style={styles.inputContainer}>
						<DefaultInput placeholder="Your e-mail adress" style={styles.input} />
						<View onLayout={this.onLayout} style={[styles.passwordContainer, {flexDirection: this.state.height > 500 ? 'column' : 'row'}]} >
						<View onLayout={this.onLayout} style={styles.passwordWrapper} >
							<DefaultInput placeholder="Password" style={styles.input} />
						</View>
						<View onLayout={this.onLayout} style={{width: this.state.height > 500 ? '100%' : '45%'}} >
							<DefaultInput placeholder="Confirm password" style={styles.input} />
						</View>
						</View>
					</View>
					<ButtondWithBackground color="#29aaf4" onPress={this.loginHandler}>
						Submit
					</ButtondWithBackground>
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
	},
	passwordContainer: {
		justifyContent: 'space-between'
	}
});

export default AuthScreen;
