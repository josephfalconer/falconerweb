import * as ActionTypes from './actiontypes';

export function updateStoreState(payload) {
  return {
    type: ActionTypes.SIMPLE_STATE_UPDATE,
    payload
  }
}

export function addPagesData(payload) {
  return {
    type: ActionTypes.ADD_PAGES_DATA,
    pagesData: payload.map((parentPage, x) => {
      return {
        ...parentPage,
        x: x,
        y: 0,
        child_pages: parentPage.child_pages.map((childPage, y) => {
          return {
            ...childPage,
            x: x,
            y: y + 1,
          }
        })
      }
    })
  }
}

export function updatePreviousPage(previousPage) {
  return {
    type: ActionTypes.UPDATE_PREVIOUS_PAGE,
    previousPage
  }
}
