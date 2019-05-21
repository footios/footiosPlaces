import { uiStartLoading, uiStopLoading } from './ui';
import startMainTabs from '../../screens/MainTabs/startMainTabs';
import { AUTH_SET_TOKEN } from "./actionTypes";

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
						dispatch(authSetToken(parsedRes.idToken));
						startMainTabs();
					}
				})	
				.catch((err) => {
					console.log(err);
					dispatch(uiStopLoading());
					alert('Authentication failed, please try again!');
				})
		};
	};

	export const authSetToken = token => {
		return {
			type: AUTH_SET_TOKEN,
			token: token
		}
	}


// AIzaSyD2TLX0tvJFrydRcAfrmiVKiSSij0i3nz4
