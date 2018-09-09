import React, { PropTypes, PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import Zone from './Zone';
import { updateStoreState } from '../actions';
import { ZONE_TRANSITION_TIMEOUT } from '../constants';
import * as helpers from '../helpers';


class IncomingZone extends PureComponent {
	static propTypes = {
		data: PropTypes.object.isRequired,
		ownChildZones: PropTypes.array,
		pathToParent: PropTypes.string.isRequired,
		isParentZone: PropTypes.bool,
		outgoingZone: PropTypes.object,
		currentZone: PropTypes.object,
		isMovingZones: PropTypes.bool.isRequired,
	}

	componentDidMount() {
		const {
			data,
			isParentZone,
			ownChildZones,
			pathToParent,
			updateStoreState
		} = this.props;
		let storeUpdateData = {
			currentParentZoneHash: pathToParent,
			currentZone: data,
			currentTextColour: data.text_colour,
			isMovingZones: true,
		}
		if (isParentZone) {
			storeUpdateData['currentChildZones'] = ownChildZones;
		}
		updateStoreState(storeUpdateData);
		setTimeout(() => updateStoreState({isMovingZones: false}), ZONE_TRANSITION_TIMEOUT);
	}

	componentWillUnmount() {
		this.props.updateStoreState({outgoingZone: this.props.data});
	}

	getTransitonClass = () => {
		const { outgoingZone, currentZone } = this.props;
		let transitionClass = ' js-incoming js-incoming-';
		if (helpers.isSideways(currentZone, outgoingZone)) {
			return transitionClass += helpers.isLeftwards(currentZone, outgoingZone) ? 'left' : 'right';
		}
		if (helpers.isVertical(currentZone, outgoingZone)) {
			return transitionClass += helpers.isUpwards(currentZone, outgoingZone) ? 'top' : 'bottom';
		}
		return transitionClass += 'fade';
	}

	render() {
		const { data, outgoingZone, isMovingZones } = this.props;
		let zoneClass = 'region';
 		if (outgoingZone && isMovingZones) {
 			zoneClass += this.getTransitonClass();
 		}
		return (
			<Zone data={data} zoneClass={zoneClass} />
		)
	}
}

function mapStateToProps({
	isMovingZones, 
	outgoingZone, 
	currentZone,
}, props) {
	return {
		...props,
		isMovingZones,
		outgoingZone,
		currentZone,
	}
}

export default withRouter(connect(mapStateToProps, {
	updateStoreState
})(IncomingZone));
