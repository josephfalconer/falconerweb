import * as RegionActionTypes from '../actiontypes/transitions';

const initialState = {
	isMovingRegions: false,
	regionTransitionTimeout: 1000,
	currentTextColour: 'light',
}

export default function Regions(state=initialState, action) {

	switch(action.type) {

		case RegionActionTypes.SET_MOVING_REGIONS: {
			return {
				...state,
				isMovingRegions: action.data
			};
		}

		case RegionActionTypes.SET_OUTGOING_REGION: {
			return {
				...state,
				outgoingRegion: action.data
			};
		}

		case RegionActionTypes.SET_CURRENT_REGION: {
			return {
				...state,
				currentRegion: action.data
			};
		}

		case RegionActionTypes.SET_TEXT_COLOUR: {
			return {
				...state,
				currentTextColour: action.data
			};
		}
			
		default:
			return state
	}
	
}