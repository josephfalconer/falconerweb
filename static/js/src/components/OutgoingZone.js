import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { isSideways, isVertical, isLeftwards, isUpwards } from '../helpers';
import Zone from './Zone';


const OutgoingZone = props => {
	// compare incoming and outgoing - Redux store
	const { data, outgoingZone, currentZone } = props;

	let zoneClass = 'region js-outgoing js-outgoing-';

	// exit to left or right
	if (isSideways(currentZone, outgoingZone)) {
		zoneClass += isLeftwards(currentZone, outgoingZone) ? 'right' : 'left';

	// exit to top or bottom
	} else if (isVertical(currentZone, outgoingZone)) {
		zoneClass += isUpwards(currentZone, outgoingZone) ? 'bottom' : 'top';

	// fade out
	} else {
		zoneClass += 'fade';
	}

	return (
		<Zone
			data={data}
			zoneClass={zoneClass}
		/>
	)
}

const mapStateToProps = state => (
    {
    	outgoingZone: state.transitions.outgoingZone,
    	currentZone: state.transitions.currentZone,
    }
);

export default connect(mapStateToProps)(OutgoingZone);