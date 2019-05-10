import React, { Component } from 'react';
import { View, Dimensions, StyleSheet, ImageBackground } from 'react-native';
import { connect } from 'react-redux';

import startMainTabs from '../MainTabs/startMainTabs';
import DefaultInput from '../../components/UI/DefaultInput/DefaultInput';
import HeadingText from '../../components/UI/HeadingText/HeadingText';
import MainText from '../../components/UI/MainText/MainText';
import backgroundImage from '../../assets/background.jpg';
import ButtondWithBackground from '../../components/UI/ButtonWithBackground/ButtonWithBackground';
import validation from '../../utility/validation';

import { tryAuth } from '../../store/actions'
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
				}, 
				touched: false,
			},
			password: {
				value: '',
				valid: false,
				validationRules: {
					minLength: 6
				}, 
				touched: false,
			},
			confirmPassword: {
				value: '',
				valid: false,
				validationRules: {
					equalTo: 'password'
				}, 
				touched: false,
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
		const authData = {
			email: this.state.controls.email,
			password: this.state.controls.password
		}
		this.props.onLogin(authData)
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
						valid: validation(value, prevState.controls[key].validationRules, connectedValue),
						touched: true
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
							valid={this.state.controls.email.valid}
							touched={this.state.controls.email.touched}

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
									valid={this.state.controls.password.valid}
									touched={this.state.controls.password.touched}

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
									valid={this.state.controls.confirmPassword.valid}
									touched={this.state.controls.confirmPassword.touched}


								/>
							</View>
						</View>
					</View>
					<ButtondWithBackground 
						color="#29aaf4" 
						onPress={this.loginHandler}
						disabled={
							!this.state.controls.email.valid ||
							!this.state.controls.password.valid ||
							!this.state.controls.confirmPassword.valid
						}
						>
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

const mapDispatchToProps = dispatch => {
	return {
		onLogin: (authData) => dispatch(tryAuth(authData))
	}
}

export default connect(null, mapDispatchToProps)(AuthScreen);
