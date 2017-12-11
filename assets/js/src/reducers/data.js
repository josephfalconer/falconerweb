import * as DataActionTypes from '../actiontypes/data';

const initialState = {
	navigationLinks: [],
	primaryRegions: [],
	subRegions: [],
	contentModules: [],
	skills: [],
	demos: [],
	currentSubRegions: []
}

export default function Data(state=initialState, action) {

	switch(action.type) {

		case DataActionTypes.ADD_NAVIGATION_ITEMS: {
			return {
				...state,
				navigationLinks: action.data
			};
		}

		case DataActionTypes.ADD_PRIMARY_REGIONS: {
			return {
				...state,
				primaryRegions: action.data
			};
		}

		case DataActionTypes.ADD_SUB_REGIONS: {
			return {
				...state,
				subRegions: action.data
			};
		}

		case DataActionTypes.ADD_CONTENT_MODULES: {
			return {
				...state,
				contentModules: action.data
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