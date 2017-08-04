import * as DataActionTypes from '../actiontypes/data';

export const addData = (data, type) => {

	// each region gets x-y position values
	if (type == 'ADD_REGIONS') {
		let	x = 0, y = 0;

		for (let region of data) {
			if (x == 4)
				x = 0, y++;

			region.x = x, region.y = y, x++;
		}
	} 

	return {
		type: DataActionTypes[type],
		data
	}
};