import React, { PropTypes, PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import Zone from './Zone';
import { updateOutgoingZone, updateStoreState } from '../actions';
import { ZONE_TRANSITION_TIMEOUT } from '../constants';
import * as helpers from '../helpers';

class IncomingZone extends PureComponent {
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
		this.props.updateOutgoingZone(this.props.data, this.props.currentZoneScrollWrapper.scrollTop);
	}

	getTransitonClass = () => {
		const { outgoingZone, currentZone } = this.props;
		let transitionClass = 'js-incoming js-incoming-';
		if (helpers.isSideways(currentZone, outgoingZone)) {
			return transitionClass += helpers.isLeftwards(currentZone, outgoingZone) ? 'left' : 'right';
		}
		if (helpers.isVertical(currentZone, outgoingZone)) {
			return transitionClass += helpers.isUpwards(currentZone, outgoingZone) ? 'top' : 'bottom';
		}
		return transitionClass += 'fade';
	}

	render() {
		let zoneClass = 'region';
		if (this.props.outgoingZone && this.props.isMovingZones) {
			zoneClass = `${zoneClass} js-hide-overflow ${this.getTransitonClass()}`;
 		}
		return (
			<Zone
				data={this.props.data}
				zoneClass={zoneClass}
				updateStoreState={this.props.updateStoreState}
			/>
		)
	}
}

IncomingZone.propTypes = {
	data: PropTypes.object.isRequired,
	ownChildZones: PropTypes.array,
	pathToParent: PropTypes.string.isRequired,
	isParentZone: PropTypes.bool,
	outgoingZone: PropTypes.object,
	currentZone: PropTypes.object,
	isMovingZones: PropTypes.bool.isRequired,
	updateStoreState: PropTypes.func.isRequired,
	currentZoneScrollWrapper: PropTypes.object,
	updateOutgoingZone: PropTypes.func.isRequired,
}

function mapStateToProps({
	isMovingZones, 
	outgoingZone, 
	currentZone,
	currentZoneScrollWrapper,
}, props) {
	return {
		...props,
		isMovingZones,
		outgoingZone,
		currentZone,
		currentZoneScrollWrapper
	}
}

export default connect(mapStateToProps, {
	updateOutgoingZone,
	updateStoreState
})(IncomingZone);
