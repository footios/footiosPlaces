import React, { Component } from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';

import startMainTabs from '../MainTabs/startMainTabs';
import DefaultInput from '../../components/UI/DefaultInput/DefaultInput';
import HeadingText from '../../components/UI/HeadingText/HeadingText';
import MainText from '../../components/UI/MainText/MainText'

/* Screens are components we load through RNNavigation (instead of Router)! */

class AuthScreen extends Component {
	loginHandler = () => {
		startMainTabs();
	};

	render() {
		return (
			<View style={styles.container}>
            <MainText>
				<HeadingText>Please Log in</HeadingText>
            </MainText>
				<Button title="Switch to Login" />
				<View style={styles.inputContainer}>
					<DefaultInput placeholder="Your e-mail adress" style={styles.input} />
					<DefaultInput placeholder="Password" style={styles.input} />
					<DefaultInput placeholder="Confirm password" style={styles.input} />
				</View>
				<Button title="Submit" onPress={this.loginHandler} />
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
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
