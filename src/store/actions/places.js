import { ADD_PLACE, DELETE_PLACE } from './actionTypes';
import { uiStartLoading, uiStopLoading } from '../actions/ui';

export const addPlace = (placeName, location, image) => {
	return dispatch => {
        dispatch(uiStartLoading());
        // with this fetch we trigger the cloud function on Firebase
        fetch("https://us-central1-footiosplaces-1557725622585.cloudfunctions.net/storeImage", {
            method: "POST",
            body: JSON.stringify({
                image: image.base64
            })
        })
        .catch(err => { // will NOT handle 4xx or 5xx errors! Only missing network connectivity.
            console.log(err);
            alert("Something went wrong, please try again!")
            dispatch(uiStopLoading());
        })
        .then(res => res.json())
        .then(parsedRes => {
            const placeData = {
                name: placeName,
                location: location,
                image: parsedRes.imageUrl
            };
            // with this fetch we tartget the database
            return fetch("https://footiosplaces-1557725622585.firebaseio.com/places.json", {
                method: "POST",
                body: JSON.stringify(placeData)
            })
        })  
        .catch(err => { // catches all 4xx and 5xx errors
            console.log(err);
            alert("Something went wrong, please try again!")
            dispatch(uiStopLoading());
        })
        .then(res => res.json())
        .then(parsedRes => {
            console.log(parsedRes);
            dispatch(uiStopLoading());
        });
    };
};
// 'https://us-central1-footiosplaces-1557725622585.cloudfunctions.net/storeImage'
// 'https://footiosplaces-1557725622585.firebaseio.com/places.json'

export const deletePlace = (key) => {
	return {
		type: DELETE_PLACE,
		placeKey: key
	};
};
