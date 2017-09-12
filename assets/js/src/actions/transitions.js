import * as TransitionActionTypes from '../actiontypes/transitions';

export const updateTransitions = (data, type) => {
	return {
		type: TransitionActionTypes[type],
		data
	}
};