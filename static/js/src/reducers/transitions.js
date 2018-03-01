import * as TransitionActionTypes from '../actiontypes/transitions';


const initialState = {
	isMovingZones: false,
	zoneTransitionTimeout: 1000,
	currentTextColour: 'light',
	currentChildZones: [],
}

export default function Transitions(state=initialState, action) {

	switch(action.type) {

		case TransitionActionTypes.SET_MOVING_ZONES: {
			return {
				...state,
				isMovingZones: action.data
			};
		}

		case TransitionActionTypes.SET_CURRENT_ZONE: {
			return {
				...state,
				currentZone: action.data
			};
		}

		case TransitionActionTypes.SET_CURRENT_CHILD_ZONES: {
			return {
				...state,
				currentChildZones: action.data
			};
		}

		case TransitionActionTypes.UPDATE_CURRENT_MATCH: {
			return {
				...state,
				parentPathHash: action.data
			};
		}

		case TransitionActionTypes.SET_TEXT_COLOUR: {
			return {
				...state,
				currentTextColour: action.data
			};
		}

		case TransitionActionTypes.SET_OUTGOING_ZONE: {
			return {
				...state,
				outgoingZone: action.data
			};
		}

		default:
			return state
	}

}
