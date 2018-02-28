export const isSideways = (currentZone, outgoingZone) => {
	return outgoingZone.y == currentZone.y && Math.abs(outgoingZone.x - currentZone.x) == 1;
}

export const isVertical = (currentZone, outgoingZone) => {
	return outgoingZone.x == currentZone.x && Math.abs(outgoingZone.y - currentZone.y) == 1;
}

export const isLeftwards = (currentZone, outgoingZone) => {
	return currentZone.x < outgoingZone.x;
}

export const isUpwards = (currentZone, outgoingZone) => {
	return currentZone.y < outgoingZone.y;
}

export const formatHash = (newHash, currentMatch) => {
	let isToTop = newHash === currentMatch;
	return `/${currentMatch}${isToTop ? '' : '/' + newHash}`;
}
