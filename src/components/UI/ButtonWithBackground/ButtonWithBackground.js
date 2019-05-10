import React from 'react';
import { TouchableOpacity, TouchableNativeFeedback, Text, View, StyleSheet, Platform } from 'react-native';

const buttonWithBackground = props => {
    const content = (
        <View style={[
            styles.button, 
            {backgroundColor: props.color}, 
            props.disabled ? styles.disabled : null]}
            >
            <Text style={ props.disabled ? styles.disalbledText : null} >{props.children}</Text>
        </View>
    );
    // this makes the button untouchable
    if (props.disabled) {
        return content;
    }
    return (
         Platform.OS === 'android' ? (
                    <TouchableNativeFeedback onPress={props.onPress}>
                        {content}
                    </TouchableNativeFeedback>
                ) : (
                    <TouchableOpacity onPress={props.onPress}>
                        {content}
                    </TouchableOpacity>
                )
        )
};

const styles = StyleSheet.create({
	button: {
		padding: 10,
		margin: 5,
		borderRadius: 5,
		borderWidth: 1,
		borderColor: 'black'
    }, 
    disabled: {
        backgroundColor: '#eee',
        borderColor: '#aaa'
    },
    disalbledText: {
        color: '#aaa'
    }
});

export default buttonWithBackground;
