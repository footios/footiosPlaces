import { ADD_PLACE, DELETE_PLACE } from './actionTypes';

export const addPlace = (placeName, location, image) => {
	// return {
	//     type: ADD_PLACE,
	//     placeName: placeName,
	//     location: location,
	//     image: image
	// };
	return dispatch => {
        // with this fetch we trigger the cloud function on Firebase
        fetch("https://us-central1-footiosplaces-1557725622585.cloudfunctions.net/storeImage", {
            method: "POST",
            body: JSON.stringify({
                image: image.base64
            })
        })
        .catch(err => console.log(err))
        .then(res => res.json())
        .then(parsedRes => {
            const placeData = {
                name: placeName,
                location: location,
                image: parsedRes.imageUrl
            };
            return fetch("https://footiosplaces-1557725622585.firebaseio.com/places.json", {
                method: "POST",
                body: JSON.stringify(placeData)
            })
        })  
        .catch(err => console.log(err))
        .then(res => res.json())
        .then(parsedRes => {
            console.log(parsedRes);
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
