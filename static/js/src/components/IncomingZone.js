import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { bindActionCreators } from 'redux';

import Zone from './Zone';
import { updateTransitions } from '../actions/transitions';
import * as helpers from '../helpers';


class IncomingZone extends Component {
	static propTypes = {
		currentZone: PropTypes.object,
		data: PropTypes.object.isRequired,
		outgoingZone: PropTypes.object,
		ownChildZones: PropTypes.array,
		pathToParent: PropTypes.string.isRequired,
		timeoutDelay: PropTypes.number.isRequired,
		isMovingZones: PropTypes.bool.isRequired,
	}

	componentDidMount() {
		const {
			data,
			timeoutDelay,
			isParentZone,
			ownChildZones,
			pathToParent,
			updateTransitions
		} = this.props;
		// allows direction buttons to render
		updateTransitions(data, 'SET_CURRENT_ZONE');
		// allows outgoing zone to render
		updateTransitions(true, 'SET_MOVING_ZONES');
		// affects styles for nav and direction buttons
		updateTransitions(data.text_colour, 'SET_TEXT_COLOUR');
		updateTransitions(pathToParent, 'UPDATE_CURRENT_MATCH');
		if (isParentZone) {
			updateTransitions(ownChildZones, 'SET_CURRENT_CHILD_ZONES');
		}
		setTimeout(() => {
			updateTransitions(false, 'SET_MOVING_ZONES');
		}, timeoutDelay);
	}

	componentWillUnmount() {
		// show this zone outgoing
		this.props.updateTransitions(this.props.data, 'SET_OUTGOING_ZONE');
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
		// apply an animation
 		if (outgoingZone && isMovingZones) {
 			zoneClass += this.getTransitonClass();
 		}
		return (
			<Zone data={data} zoneClass={zoneClass} />
		)
	}
}

const mapStateToProps = state => (
    {
    	isMovingZones: state.transitions.isMovingZones,
    	outgoingZone: state.transitions.outgoingZone,
    	currentZone: state.transitions.currentZone,
    	timeoutDelay: state.transitions.zoneTransitionTimeout,
    }
);

export default withRouter(connect(mapStateToProps, {
	updateTransitions
})(IncomingZone));
