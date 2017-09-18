import * as TransitionActionTypes from '../actiontypes/transitions';


const initialState = {
	isMovingRegions: false,
	regionTransitionTimeout: 1000,
	currentTextColour: 'light',
	currentSubRegions: [],
}

export default function Transitions(state=initialState, action) {

	switch(action.type) {

		case TransitionActionTypes.SET_MOVING_REGIONS: {
			return {
				...state,
				isMovingRegions: action.data
			};
		}

		case TransitionActionTypes.SET_CURRENT_PRIMARY_REGION: {
			return {
				...state,
				currentPrimaryRegion: action.data
			};
		}

		case TransitionActionTypes.SET_CURRENT_SUB_REGIONS: {
			return {
				...state,
				currentSubRegions: action.data
			};
		}

		case TransitionActionTypes.SET_CURRENT_REGION: {
			return {
				...state,
				currentRegion: action.data
			};
		}

		case TransitionActionTypes.SET_TEXT_COLOUR: {
			return {
				...state,
				currentTextColour: action.data
			};
		}

		case TransitionActionTypes.SET_OUTGOING_REGION: {
			return {
				...state,
				outgoingRegion: action.data
			};
		}

		default:
			return state
	}
	
}
