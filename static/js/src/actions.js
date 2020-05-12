import * as ActionTypes from './actiontypes';

export const formatPagePositions = pages => pages.map((page, x) => ({
  ...page,
  x: x,
  y: 0,
  child_pages: page.child_pages.map((childPage, y) => ({
    ...childPage,
    x: x,
    y: y + 1,
  }))
}))

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
