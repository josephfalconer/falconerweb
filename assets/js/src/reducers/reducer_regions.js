import * as RegionActionTypes from '../actiontypes/regions';

const initialState = {
	currentRegion: {}
}

export default function Regions(state=initialState, action) {

	switch(action.type) {

		case RegionActionTypes.SET_CURRENT_REGION: {
			return {
				...state,
				currentRegion: action.data
			};
		}

		case RegionActionTypes.SET_TRANSITION_CLASS: {
			return {
				...state,
				transitionClass: action.data
			};
		}
			
		default:
			return state
	}
	
}