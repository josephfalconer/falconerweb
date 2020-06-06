import * as ActionTypes from './actiontypes';

export function updateStoreState(payload) {
  return {
    type: ActionTypes.SIMPLE_STATE_UPDATE,
    payload
  }
}

export function updatePreviousPage(previousPage) {
  return {
    type: ActionTypes.UPDATE_PREVIOUS_PAGE,
    previousPage
  }
}
