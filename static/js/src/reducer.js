import * as ActionTypes from './actiontypes';

const INITIAL_STATE = {
  navigationLinks: [],
  parentZones: [],
  skills: [],
  currentSubZones: [],
  isMovingZones: false,
  currentTextColour: 'light',
}

export default function simpleReducer(state = INITIAL_STATE, action) {
  switch(action.type) {
    case ActionTypes.SIMPLE_STATE_UPDATE:
      return {
        ...state,
        ...action.payload
      }
    case ActionTypes.ADD_ZONES_DATA:
      return {
        ...state,
        parentZones: action.zonesData
      }
    case ActionTypes.UPDATE_OUTGOING_ZONE:
      const outgoingZone = {
        ...action.outgoingZone,
        lastScrollTop: action.lastScrollTop
      };
      let parentZones = state.parentZones;
      if (outgoingZone.is_child_zone) {
        parentZones[outgoingZone.x].child_zones[outgoingZone.y - 1] = outgoingZone;
      } else {
        parentZones[outgoingZone.x] = outgoingZone;
      }
      return {
        ...state,
        outgoingZone,
        parentZones
      }
    default:
      return state;
  }
}