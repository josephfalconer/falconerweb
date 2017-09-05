import * as RegionActionTypes from '../actiontypes/transitions';

export const setTransitionsData = (data, type) => {
	return {
		type: RegionActionTypes[type],
		data
	}
};