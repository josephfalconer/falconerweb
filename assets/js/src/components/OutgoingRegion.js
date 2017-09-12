import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { isSideways, isVertical, isLeftwards, isUpwards } from '../actions/transitions';
import Region from './Region';


const OutgoingRegion = props => {
	// compare incoming and outgoing - Redux store
	const { data, outgoingRegion, currentRegion } = props;

	let regionClass = 'region js-outgoing js-outgoing-';

	// exit to left or right
	if (isSideways(currentRegion, outgoingRegion)) {
		regionClass += isLeftwards(currentRegion, outgoingRegion) ? 'right' : 'left';

	// exit to top or bottom
	} else if (isVertical(currentRegion, outgoingRegion)) {
		regionClass += isUpwards(currentRegion, outgoingRegion) ? 'bottom' : 'top';

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