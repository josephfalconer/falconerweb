import * as ActionTypes from './actiontypes';

const INITIAL_STATE = {
  navigationLinks: [],
  parentZones: [],
  skills: [],
  currentSubZones: [],
  isMovingZones: false,
  currentTextColour: 'light',
  currentChildZones: [],
}

export default function simpleReducer(state = INITIAL_STATE, action) {
  switch(action.type) {
    case ActionTypes.SIMPLE_STATE_UPDATE:
      return {
        ...state,
        ...action.payload
      }
    default:
      return state;
  }
}