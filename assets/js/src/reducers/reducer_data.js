import * as DataActionTypes from '../actiontypes/data';

const initialState = {
	navigationLinks: [],
	regions: [],
	primaryRegions: [],
	subRegions: [],
	contentModules: [],
	skills: [],
	demos: [],
	projects: []
}

export default function Data(state=initialState, action) {

	switch(action.type) {

		case DataActionTypes.ADD_NAVIGATION_ITEMS: {
			return {
				...state,
				navigationLinks: action.data
			};
		}

		case DataActionTypes.ADD_REGIONS: {
			return {
				...state,
				regions: action.data
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

		case DataActionTypes.ADD_PROJECTS: {
			return {
				...state,
				projects: action.data
			};
		}
			
		default:
			return state
	}
	
}