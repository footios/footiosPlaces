const validation = (val, rules, connectedValue) => {
	let isValid = true;
	for (let rule in rules) {
		switch (rule) {
			case 'isEmail':
				isValid = isValid && emailValidator(val);
				break;
			case 'minLength':
				isValid = isValid && minLengthValidator(val, rules[rule]);
				break;
			case 'equalTo':
				isValid = isValid && equalToValidator(val, connectedValue[rule]);
				break;
			case 'string':
				isValid = isValid && placeIsString(val);
				break;
			default:
				isValid = true;
		}
	}
	return isValid;
};

const emailValidator = (val) => {
    // use the const result to avoid unusual behavior...
    const result = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(
		val
	);
	return result;
};

const minLengthValidator = (val, minLength) => {
	return val.length >= minLength;
};

const equalToValidator = (val, checkValue) => {
	return val === checkValue;
};

const placeIsString = (val) => {
	if (val.trim() !== '') {
		return true
	}
}

export default validation;
