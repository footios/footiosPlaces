import React, { Component } from 'react';
import { View, Dimensions, StyleSheet, ImageBackground } from 'react-native';

import startMainTabs from '../MainTabs/startMainTabs';
import DefaultInput from '../../components/UI/DefaultInput/DefaultInput';
import HeadingText from '../../components/UI/HeadingText/HeadingText';
import MainText from '../../components/UI/MainText/MainText';
import backgroundImage from '../../assets/background.jpg';
import ButtondWithBackground from '../../components/UI/ButtonWithBackground/ButtonWithBackground';
import validation from '../../utility/validation';
/* Screens are components we load through RNNavigation (instead of Router)! */

class AuthScreen extends Component {
	/* Because we manage the responsiveness of the UI in the state,
	 but we miss the optimazation the StyleSheet does.
	 But we can use an alternative: 
	 Define two different rulls in StyleSheet and load them
	 according to viewMode. */
	state = {
		viewMode: Dimensions.get('window').height > 500 ? 'portrait' : 'landscape',
		controls: {
			email: {
				value: '',
				valid: false,
				validationRules: {
					isEmail: true
				}
			},
			password: {
				value: '',
				valid: false,
				validationRules: {
					minLength: 6
				}
			},
			confirmPassword: {
				value: '',
				valid: false,
				validationRules: {
					equalTo: 'password'
				}
			}
		}
	};
	constructor(props) {
		super(props);
		Dimensions.addEventListener('change', this.updateStyles);
	}
	// for avoiding momory leaks
	componentWillUnmount() {
		Dimensions.removeEventListener('change', this.updateStyles);
	}

	updateStyles = (dms) => {
		this.setState({
			viewMode: dms.window.height > 500 ? 'portrait' : 'landscape'
		});
	};

	loginHandler = () => {
		startMainTabs();
	};

	updateInputState = (key, value) => {
		let connectedValue = {};
		if (this.state.controls[key].validationRules.equalTo) {
			// equalControl = 'password'
			const equalControl = this.state.controls[key].validationRules.equalTo;
			// so now we can get the value of the password...
			const equalValue = this.state.controls[equalControl].value;
			connectedValue = {
				...connectedValue,
				equalTo: equalValue
			};
		}
		if (key === 'password') {
			connectedValue = {
				...connectedValue,
				equalTo: value
			};
		}
		this.setState((prevState) => {
			return {
				...prevState,
				controls: {
					...prevState.controls,
					confirmPassword: {
						...prevState.controls.confirmPassword,
						valid:
							key === 'password'
								? validation(
										prevState.controls.confirmPassword.value,
										prevState.controls.confirmPassword.validationRules,
										connectedValue
									)
								: prevState.controls.confirmPassword.valid
					},
					[key]: {
						...prevState.controls[key],
						value: value,
						valid: validation(value, prevState.controls[key].validationRules, connectedValue)
					}
				}
			};
		});
	};

	render() {
		let headingText = null;
		if (this.state.viewMode === 'portrait') {
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
						<DefaultInput
							placeholder="Your e-mail adress"
							style={styles.input}
							value={this.state.controls.email.value}
							onChangeText={(val) => this.updateInputState('email', val)}
						/>
						<View
							style={
								this.state.viewMode === 'landscape' ? (
									styles.landscapePasswordContainer
								) : (
									styles.portraitPasswordContainer
								)
							}
						>
							<View
								style={
									this.state.viewMode === 'landscape' ? (
										styles.landscapePasswordWrapper
									) : (
										styles.portraitPasswordWrapper
									)
								}
							>
								<DefaultInput
									placeholder="Password"
									style={styles.input}
									value={this.state.controls.password.value}
									onChangeText={(val) => this.updateInputState('password', val)}
								/>
							</View>
							<View
								style={
									this.state.viewMode === 'landscape' ? (
										styles.landscapePasswordWrapper
									) : (
										styles.portraitPasswordWrapper
									)
								}
							>
								<DefaultInput
									placeholder="Confirm password"
									style={styles.input}
									value={this.state.controls.confirmPassword.value}
									onChangeText={(val) => this.updateInputState('confirmPassword', val)}
								/>
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
	landscapePasswordContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	portraitPasswordContainer: {
		flexDirection: 'column',
		justifyContent: 'flex-start'
	},
	landscapePasswordWrapper: {
		width: '45%'
	},
	portraitPasswordWrapper: {
		width: '100%'
	}
});

export default AuthScreen;
