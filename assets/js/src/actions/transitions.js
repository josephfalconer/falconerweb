import * as RegionActionTypes from '../actiontypes/transitions';

export const setRegionsData = (data, type) => {
	return {
		type: RegionActionTypes[type],
		data
	}
};