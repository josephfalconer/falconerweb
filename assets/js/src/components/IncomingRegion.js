import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Region from './Region';
import * as TransitionActionCreators from '../actions/transitions';


class IncomingRegion extends Component {

	static propTypes = {
		data: PropTypes.object.isRequired,
		outgoingRegion: PropTypes.object,
		currentRegion: PropTypes.object,
		timeoutDelay: PropTypes.number.isRequired,
		dispatch: PropTypes.func.isRequired,
	}
	
	componentDidMount() {
		const { dispatch, data, timeoutDelay } = this.props;

		const updateTransitions = bindActionCreators(TransitionActionCreators.updateTransitions, dispatch);
		
		// allows direction buttons to render
		updateTransitions(data, 'SET_CURRENT_REGION');

		// allows outgoing region to render
		updateTransitions(true, 'SET_MOVING_REGIONS');

		// affects styles for nav and direction buttons
		updateTransitions(data.text_colour, 'SET_TEXT_COLOUR');

		// next transition shows this Region instance as outgoing
		setTimeout(() => {
			updateTransitions(false, 'SET_MOVING_REGIONS');
			updateTransitions(data, 'SET_OUTGOING_REGION');
		}, timeoutDelay);
	}

	getTransitonClass = () => {
		// compare incoming and outgoing - Redux store
		const { outgoingRegion, currentRegion } = this.props,
			isSideways = outgoingRegion.y == currentRegion.y && Math.abs(outgoingRegion.x - currentRegion.x) == 1,
			isVertical = outgoingRegion.x == currentRegion.x && Math.abs(outgoingRegion.y - currentRegion.y) == 1,
			isLeftwards = currentRegion.x < outgoingRegion.x,
			isUpwards = currentRegion.y < outgoingRegion.y;

		let transitionClass = ' js-incoming js-incoming-';

		// enter from left or right
		if (isSideways) {
			transitionClass += isLeftwards ? 'left' : 'right';

		// enter from top or bottom
		} else if (isVertical) {
			transitionClass += isUpwards ? 'top' : 'bottom';

		// fade in
		} else {
			transitionClass += 'fade';
		}

		return transitionClass;
	}

	render() {
		const { data, outgoingRegion, isMovingRegions } = this.props;

		let regionClass = 'region';

		// apply an animation 
 		if (outgoingRegion && isMovingRegions) {
 			regionClass += this.getTransitonClass();
 		}

		return (
			<Region 
				data={data} 
				regionClass={regionClass}
			/>		
		)
	}
}

const mapStateToProps = state => (
    {
    	isMovingRegions: state.transitions.isMovingRegions,
    	outgoingRegion: state.transitions.outgoingRegion,
    	currentRegion: state.transitions.currentRegion,
    	timeoutDelay: state.transitions.regionTransitionTimeout,
    }
);

export default connect(mapStateToProps)(IncomingRegion);
