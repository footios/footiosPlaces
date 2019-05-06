import React from 'react'
import { TextInput, StyleSheet } from 'react-native'

const defaultInput = (props) => {
    return ( 
        /* underlineColorAndroid='transparent'
        not needed! we got no underline 
        
        [styles.input, props.style]
        use an array to merge the default styles with
        the styles you get from outside (e.g. AuthScreen)

        */
        <TextInput 
        {...props} 
        style={[styles.input, props.style]} 
        underlineColorAndroid='transparent'
        />
       
     );
}

const styles = StyleSheet.create({
	input: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#eee',
        padding: 5,
        margin: 8        
	} 
});

 
export default defaultInput;