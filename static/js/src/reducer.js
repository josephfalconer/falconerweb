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
    case ActionTypes.UPDATE_OUTGOING_PAGE:
      const outgoingPage = {
        ...action.outgoingPage,
        lastScrollTop: action.lastScrollTop
      };
      let parentPages = state.parentPages;
      if (outgoingPage.is_child_page) {
        parentPages[outgoingPage.x].child_pages[outgoingPage.y - 1] = outgoingPage;
      } else {
        parentPages[outgoingPage.x] = outgoingPage;
      }
      return {
        ...state,
        outgoingPage,
        parentPages
      }
    default:
      return state;
  }
}
