import * as RegionActionTypes from '../actiontypes/regions';

export const updateRegionData = (data, type) => {
	return {
		type: RegionActionTypes[type],
		data
	}
};