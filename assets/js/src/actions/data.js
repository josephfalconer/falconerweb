import * as DataActionTypes from '../actiontypes/data';

export const addData = (data, type) => {

	if (type == 'ADD_PRIMARY_REGIONS') {
		let	i = 0;

		for (let region of data) {
			region.index = i, region.x = i, region.y = 0, i++;
		}
	} 

	return {
		type: DataActionTypes[type],
		data
	}
};