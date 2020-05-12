import * as ActionTypes from './actiontypes';

const INITIAL_STATE = {
  navigationLinks: [],
  parentPages: [],
  skills: [],
  isPageTransition: false,
  currentTextColour: 'light',
}

export default function simpleReducer(state = INITIAL_STATE, action) {
  switch(action.type) {
    case ActionTypes.SIMPLE_STATE_UPDATE:
      return {
        ...state,
        ...action.payload
      }
    case ActionTypes.ADD_PAGES_DATA:
      return {
        ...state,
        parentPages: action.pagesData
      }
    case ActionTypes.UPDATE_PREVIOUS_PAGE:
      const previousPage = action.previousPage;
      let parentPages = state.parentPages;
      // Last scroll top can be recorded
      if (previousPage.is_child_page) {
        parentPages[previousPage.x].child_pages[previousPage.y - 1] = previousPage;
      } else {
        parentPages[previousPage.x] = previousPage;
      }
      return {
        ...state,
        previousPage,
        parentPages
      }
    default:
      return state;
  }
}
