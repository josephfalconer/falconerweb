export function isSideways(currentPage, previousPage) {
  return previousPage.y == currentPage.y && Math.abs(previousPage.x - currentPage.x) == 1;
}

export function isVertical(currentPage, previousPage) {
  return previousPage.x == currentPage.x && Math.abs(previousPage.y - currentPage.y) == 1;
}

export function isLeftwards(currentPage, previousPage) {
  return currentPage.x < previousPage.x;
}

export function isUpwards(currentPage, previousPage) {
  return currentPage.y < previousPage.y;
}
