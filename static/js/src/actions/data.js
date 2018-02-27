import * as DataActionTypes from '../actiontypes/data';

export const addData = (data, type) => {
	return {
		type: DataActionTypes[type],
		data
	}
};