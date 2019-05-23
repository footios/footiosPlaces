// AIzaSyD2TLX0tvJFrydRcAfrmiVKiSSij0i3nz4
import { AsyncStorage } from 'react-native';

import { uiStartLoading, uiStopLoading } from './ui';
import startMainTabs from '../../screens/MainTabs/startMainTabs';
import { AUTH_SET_TOKEN } from './actionTypes';

export const tryAuth = (authData, authMode) => {
	return (dispatch) => {
		const apiKey = 'AIzaSyD2TLX0tvJFrydRcAfrmiVKiSSij0i3nz4';
		let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=' + apiKey;
		if (authMode === 'signup') {
			url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=' + apiKey;
		}
		dispatch(uiStartLoading());
		fetch(url, {
			method: 'POST',
			body: JSON.stringify({
				email: authData.email,
				password: authData.password,
				returnSecureToken: true
			}),
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.catch((err) => {
				console.log(err);
				dispatch(uiStopLoading());
				alert('Authentication failed, please try again!');
			})
			.then((res) => res.json())
			.then((parsedRes) => {
				dispatch(uiStopLoading());
				console.log(parsedRes);
				if (!parsedRes.idToken) {
					alert('Authentication failed, please try again!');
				} else {
					dispatch(authStoreToken(parsedRes.idToken, parsedRes.expiresIn));
					startMainTabs();
				}
			});
	};
};

export const authStoreToken = (token, expiresIn) => {
	return (dispatch) => {
		dispatch(authSetToken(token));
		const now = new Date();
		const expiryDate = now.getTime() + expiresIn * 1000;
		console.log(now, new Date(expiryDate));
		AsyncStorage.setItem('fp:auth:token', token);
		AsyncStorage.setItem('fp:auth:expiryDate', expiryDate.toString());
	};
};

export const authSetToken = (token) => {
	return {
		type: AUTH_SET_TOKEN,
		token: token
	};
};

export const authGetToken = () => {
	return (dispatch, getState) => {
		const promise = new Promise((resolve, reject) => {
			const token = getState().auth.token;
			if (!token) {
				let fetchedToken;
				AsyncStorage.getItem('fp:auth:token')
					.catch((err) => reject())
					.then((tokenFromStorage) => {
						fetchedToken = tokenFromStorage;
						if (!tokenFromStorage) {
							reject();
							return;
						}
						return AsyncStorage.getItem('fp:auth:expiryDate');
					})
					.then((expiryDate) => {
						const parsedExpiryDate = new Date(parseInt(expiryDate));
						const now = new Date();
						if (parsedExpiryDate > now) {
							dispatch(authSetToken(fetchedToken));
							resolve(fetchedToken);
						} else {
							reject();
						}
					})
					.catch((err) => reject());
			} else {
				resolve(token);
			}
		});
		promise.catch((err) => {
			dispatch(authClearStorage());
		});
		return promise;
	};
};

export const authAutoSignIn = () => {
	return (dispatch) => {
		dispatch(authGetToken())
			.then((token) => {
				startMainTabs();
			})
			.catch((err) => console.log('Failed to fetch token.'));
	};
};

export const authClearStorage = () => {
	return (dispatch) => {
		AsyncStorage.removeItem('fp:auth:token');
		AsyncStorage.removeItem('fp:auth:expiryDate');
	};
};
