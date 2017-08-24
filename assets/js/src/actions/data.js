import * as DataActionTypes from '../actiontypes/data';

export const addData = (data, type) => {

	const isPrimaryRegions = type == 'ADD_PRIMARY_REGIONS',
		isChildRegions = type == 'ADD_CHILD_REGIONS';

	// each region gets x-y position values
	if (isPrimaryRegions) {
		let	i = 0;

		for (let region of data) {
			region.index = i;

			region.x = i;
			region.y = 0;

			i++;
		}

		console.log(data);
	} 

	return {
		type: DataActionTypes[type],
		data
	}
};