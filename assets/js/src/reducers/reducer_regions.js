import * as RegionActionTypes from '../actiontypes/regions';

const initialState = {
	regionsWidth: 4,
	isMovingRegions: false,
	isAfterOutgoing: false,
	regionTransitionTimeout: 1000,
	regionsContainerClass: 'regions',
	regionsStyleOffsets: {
		left: 0,
		top: 0,
	}
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

		case RegionActionTypes.SET_OUTGOING_REGION_POSITION: {
			return {
				...state,
				isAfterOutgoing: action.data
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

		case RegionActionTypes.SET_REGIONS_OFFSETS: {
			return {
				...state,
				regionsStyleOffsets: action.data
			};
		}


			
		default:
			return state
	}
	
}