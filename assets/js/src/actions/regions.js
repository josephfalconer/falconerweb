import * as RegionActionTypes from '../actiontypes/regions';

export const setRegionsData = (data, type) => {
	return {
		type: RegionActionTypes[type],
		data
	}
};