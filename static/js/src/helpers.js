export function isSideways(currentPage, outgoingPage) {
	return outgoingPage.y == currentPage.y && Math.abs(outgoingPage.x - currentPage.x) == 1;
}

export function isVertical(currentPage, outgoingPage) {
	return outgoingPage.x == currentPage.x && Math.abs(outgoingPage.y - currentPage.y) == 1;
}

export function isLeftwards(currentPage, outgoingPage) {
	return currentPage.x < outgoingPage.x;
}

export function isUpwards(currentPage, outgoingPage) {
	return currentPage.y < outgoingPage.y;
}

export function formatVerticalPath(parentPath, targetPath) {
	const isTopTarget = targetPath === parentPath;
  let formattedPath = targetPath;
  if (parentPath !== '') {
    formattedPath = `/${parentPath}${isTopTarget ? '' : '/' + targetPath}`
  }
	return formattedPath;
}
