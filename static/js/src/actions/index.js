import * as ActionTypes from '../actiontypes';

export function updateStoreState(payload) {
  return {
    type: ActionTypes.SIMPLE_STATE_UPDATE,
    payload
  }
}