import * as TransitionActionTypes from '../actiontypes/transitions';


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

export const updateTransitions = (data, type) => {
	return {
		type: TransitionActionTypes[type],
		data
	}
};