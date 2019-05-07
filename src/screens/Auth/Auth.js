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
	state = {
		respStyles: {
			pwContainerDirection: 'column',
			pwContainerJustifyContent: 'flex-start',
			width: '100%'
		}
	};
	constructor(props) {
		super(props);
		Dimensions.addEventListener('change', (dms) => {
				this.setState({
					respStyles: {
						pwContainerDirection: Dimensions.get('window').height > 500 ? 'column' : 'row',
						pwContainerJustifyContent: Dimensions.get('window').height > 500 ?  'flex-start' : 'space-between',
						width: Dimensions.get('window').height > 500 ?'100%' : '45%'
					}
				});
		});
	}
	loginHandler = () => {
		startMainTabs();
	};

	render() {
		let headingText = null;
		if (Dimensions.get('window').height > 500) {
			headingText = (
				<MainText>
					<HeadingText>Please Log in</HeadingText>
				</MainText>
			);
		}
		return (
			<ImageBackground style={styles.backgroundImage} source={backgroundImage}>
				<View style={styles.container}>
					{headingText}
					<ButtondWithBackground color="#29aaf4" onPress={() => alert('hello world')}>
						Switch to Login
					</ButtondWithBackground>
					<View style={styles.inputContainer}>
						<DefaultInput placeholder="Your e-mail adress" style={styles.input} />
						<View
							style={{
								flexDirection: this.state.respStyles.pwContainerDirection,
								justifyContent: this.state.respStyles.pwContainerJustifyContent
							}}
						>
							<View
								style={{
									width: this.state.respStyles.pwWrapperWidth
								}}
							>
								<DefaultInput placeholder="Password" style={styles.input} />
							</View>
							<View
								style={{
									width: this.state.respStyles.pwWrapperWidth
								}}
							>
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
	}
});

export default AuthScreen;
