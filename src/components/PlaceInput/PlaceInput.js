import React from 'react';

import DefaultInput from '../UI/DefaultInput/DefaultInput';

// child of SharePlace
const placeInput = (props) => (
  <DefaultInput 
    placeholder="Place name" 
    value={props.placeName} 
    onChangeText={props.onChangeText}
    valid={props.valid}
    touched={props.touched} />
);

export default placeInput;
