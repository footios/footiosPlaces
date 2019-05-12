import React from 'react';

import DefaultInput from '../UI/DefaultInput/DefaultInput';

// child of SharePlace
const placeInput = (props) => (
  <DefaultInput 
    placeholder="Place name" 
    onChangeText={props.onChangeText} 
    value={props.placeData.value} /* placeData is a shortcut */
    valid={props.placeData.valid}
    touched={props.placeData.touched}
    />
);

export default placeInput;
