import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Region from './Region';
import * as actions from '../actions/transitions';


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

		const updateTransitions = bindActionCreators(actions.updateTransitions, dispatch);
		
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
		const { outgoingRegion, currentRegion } = this.props;

		let transitionClass = ' js-incoming js-incoming-';

		// enter from left or right
		if (actions.isSideways(currentRegion, outgoingRegion)) {
			transitionClass += actions.isLeftwards(currentRegion, outgoingRegion) ? 'left' : 'right';

		// enter from top or bottom
		} else if (actions.isVertical(currentRegion, outgoingRegion)) {
			transitionClass += actions.isUpwards(currentRegion, outgoingRegion) ? 'top' : 'bottom';

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
