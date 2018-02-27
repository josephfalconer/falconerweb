import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { bindActionCreators } from 'redux';

import Region from './Region';
import { updateTransitions } from '../actions/transitions';
import * as helpers from '../helpers';


class IncomingRegion extends Component {
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
		updateTransitions(data, 'SET_CURRENT_REGION');
		// allows outgoing region to render
		updateTransitions(true, 'SET_MOVING_REGIONS');
		// affects styles for nav and direction buttons
		updateTransitions(data.text_colour, 'SET_TEXT_COLOUR');
		updateTransitions(pathToParent, 'UPDATE_CURRENT_MATCH');
		if (isParentZone) {
			updateTransitions(ownChildZones, 'SET_CURRENT_SUB_REGIONS');
		}
		// next transition shows this Region instance as outgoing
		setTimeout(() => {
			updateTransitions(false, 'SET_MOVING_REGIONS');
		}, timeoutDelay);
	}

	componentWillUnmount() {
		this.props.updateTransitions(this.props.data, 'SET_OUTGOING_REGION');
	}

	getTransitonClass = () => {
		// compare incoming and outgoing - Redux store
		const { outgoingZone, currentZone } = this.props;
		let transitionClass = ' js-incoming js-incoming-';

		// enter from left or right
		if (helpers.isSideways(currentZone, outgoingZone)) {
			transitionClass += helpers.isLeftwards(currentZone, outgoingZone) ? 'left' : 'right';
		// enter from top or bottom
		} else if (helpers.isVertical(currentZone, outgoingZone)) {
			transitionClass += helpers.isUpwards(currentZone, outgoingZone) ? 'top' : 'bottom';
		// fade in
		} else {
			transitionClass += 'fade';
		}
		return transitionClass;
	}

	render() {
		const { data, outgoingZone, isMovingZones, childRegionPaths } = this.props;
		let regionClass = 'region';
		// apply an animation 
 		if (outgoingZone && isMovingZones) {
 			regionClass += this.getTransitonClass();
 		}
		return (
			<Region data={data} regionClass={regionClass} />		
		)
	}
}

const mapStateToProps = state => (
    {
    	isMovingZones: state.transitions.isMovingRegions,
    	outgoingZone: state.transitions.outgoingRegion,
    	currentZone: state.transitions.currentRegion,
    	timeoutDelay: state.transitions.regionTransitionTimeout,
    }
);

export default withRouter(connect(mapStateToProps, {
	updateTransitions
})(IncomingRegion));
