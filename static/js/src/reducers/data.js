import * as DataActionTypes from '../actiontypes/data';

const initialState = {
	navigationLinks: [],
	parentZones: [],
	skills: [],
	demos: [],
	currentSubZones: []
}

export default function Data(state=initialState, action) {
	switch(action.type) {
		case DataActionTypes.ADD_NAVIGATION_ITEMS: {
			return {
				...state,
				navigationLinks: action.data
			};
		}
		case DataActionTypes.ADD_ZONES: {
			return {
				...state,
				parentZones: action.data
			};
		}
		case DataActionTypes.ADD_SKILLS: {
			return {
				...state,
				skills: action.data
			};
		}
		case DataActionTypes.ADD_DEMOS: {
			return {
				...state,
				demos: action.data
			};
		}
		default:
			return state
	}

}