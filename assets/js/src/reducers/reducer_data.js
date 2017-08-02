import * as DataActionTypes from '../actiontypes/data';

const initialState = {
	navigationLinks: [],
	regions: [],
	skills: [],
	demos: [],
	projects: []
}

export default function Data(state=initialState, action) {

	switch(action.type) {

		case DataActionTypes.ADD_NAVIGATION: {
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