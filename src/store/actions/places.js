import { ADD_PLACE, DELETE_PLACE } from './actionTypes';

export const addPlace = (placeName, location, image) => {
    // return {
    //     type: ADD_PLACE,
    //     placeName: placeName,
    //     location: location,
    //     image: image
    // };
    const placeData = {
        name: placeName,
        location: location
    }
    return dispatch => {
        fetch('https://footiosplaces-1557725622585.firebaseio.com/places.json', {
            method: 'POST',
            body: JSON.stringify(placeData)
        })
        .catch(err => console.log(err))
        .then(res => res.json()) // json() will extract the data from the response
        .then(parsedRes => console.log(parsedRes))
    }
};

export const deletePlace = (key) => {
    return {
        type: DELETE_PLACE,
        placeKey: key
    };
};


