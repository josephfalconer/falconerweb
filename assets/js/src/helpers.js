export const isSideways = (currentRegion, outgoingRegion) => {
	return outgoingRegion.y == currentRegion.y && Math.abs(outgoingRegion.x - currentRegion.x) == 1;
}

export const isVertical = (currentRegion, outgoingRegion) => {
	return outgoingRegion.x == currentRegion.x && Math.abs(outgoingRegion.y - currentRegion.y) == 1;
}

export const isLeftwards = (currentRegion, outgoingRegion) => {
	return currentRegion.x < outgoingRegion.x;
}

export const isUpwards = (currentRegion, outgoingRegion) => {
	return currentRegion.y < outgoingRegion.y;
}

export const formatNewHash = (newHash, matchUrl, currentMatch) => {
	let isToTop = false;

	// between child routes/parent
	if (matchUrl) {
		isToTop = `/${newHash}` === currentMatch;
		newHash = `${currentMatch}${isToTop ? '' : '/' + newHash}`;
		return newHash;
	} 

	// between parent routes
	return newHash;
}
