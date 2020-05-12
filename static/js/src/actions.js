import * as ActionTypes from './actiontypes';

export const formatPageData = pages => pages.map((page, x) => ({
  ...page,
  x: x,
  y: 0,
  path: `/${page.slug}`,
  child_pages: page.child_pages.map((childPage, y) => ({
    ...childPage,
    x: x,
    y: y + 1,
    path: `${(page.slug !== '' ? '/' : '') + page.slug}/${childPage.slug}/`,
    is_homepage_child: page.is_homepage
  })),
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
