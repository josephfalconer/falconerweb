import * as RegionActionTypes from '../actiontypes/regions';

const initialState = {
	regionsWidth: 4,
	isMovingRegions: false,
	regionTransitionTimeout: 1000,
	regionsContainerClass: 'regions'
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

		case RegionActionTypes.SET_TRANSITION_CLASS: {
			return {
				...state,
				regionsContainerClass: action.data
			};
		}
			
		default:
			return state
	}
	
}