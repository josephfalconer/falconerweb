import * as ActionTypes from './actiontypes';

const INITIAL_STATE = {
  isPageTransition: false,
}

export default function simpleReducer(state = INITIAL_STATE, action) {
  switch(action.type) {
    case ActionTypes.SIMPLE_STATE_UPDATE:
      return {
        ...state,
        ...action.payload
      }
    case ActionTypes.UPDATE_PREVIOUS_PAGE:
      const previousPage = action.previousPage;
      let pages = state.pages;
      // Last scroll top can be recorded
      if (previousPage.is_child_page) {
        pages[previousPage.x].child_pages[previousPage.y - 1] = previousPage;
      } else {
        pages[previousPage.x] = previousPage;
      }
      return {
        ...state,
        previousPage,
        pages
      }
    default:
      return state;
  }
}
