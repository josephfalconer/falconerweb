export function isSideways(currentZone, outgoingZone) {
	return outgoingZone.y == currentZone.y && Math.abs(outgoingZone.x - currentZone.x) == 1;
}

export function isVertical(currentZone, outgoingZone) {
	return outgoingZone.x == currentZone.x && Math.abs(outgoingZone.y - currentZone.y) == 1;
}

export function isLeftwards(currentZone, outgoingZone) {
	return currentZone.x < outgoingZone.x;
}

export function isUpwards(currentZone, outgoingZone) {
	return currentZone.y < outgoingZone.y;
}

export function formatVerticalPath(parentPath, targetPath) {
	const isTopTarget = targetPath === parentPath;
	return `/${parentPath}${isTopTarget ? '' : '/' + targetPath}`;
}
