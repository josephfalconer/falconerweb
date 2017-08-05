import * as RegionActionTypes from '../actiontypes/regions';

export const setRegionData = (data, type) => {
	return {
		type: RegionActionTypes[type],
		data
	}
};