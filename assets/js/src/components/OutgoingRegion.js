import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import Region from './Region';


const OutgoingRegion = props => {
	// compare incoming and outgoing - Redux store
	const { data, outgoingRegion, currentRegion } = props,
		isSideways = outgoingRegion.y == currentRegion.y && Math.abs(outgoingRegion.x - currentRegion.x) == 1,
		isVertical = outgoingRegion.x == currentRegion.x && Math.abs(outgoingRegion.y - currentRegion.y) == 1,
		isLeftwards = currentRegion.x < outgoingRegion.x,
		isUpwards = currentRegion.y < outgoingRegion.y;

	let regionClass = 'region js-outgoing js-outgoing-';

	// exit to left or right
	if (isSideways) {
		regionClass += isLeftwards ? 'right' : 'left';

	// exit to top or bottom
	} else if (isVertical) {
		regionClass += isUpwards ? 'bottom' : 'top';

	// fade out
	} else {
		regionClass += 'fade';
	}

	return (
		<Region 
			data={data} 
			regionClass={regionClass}
		/>
	)
}


const mapStateToProps = state => (
    {
    	outgoingRegion: state.transitions.outgoingRegion,
    	currentRegion: state.transitions.currentRegion,
    }
);


export default connect(mapStateToProps)(OutgoingRegion);