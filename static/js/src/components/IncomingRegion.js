import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { bindActionCreators } from 'redux';

import Region from './Region';
import * as actions from '../actions/transitions';
import * as helpers from '../helpers';


class IncomingRegion extends Component {
	static propTypes = {
		currentRegion: PropTypes.object,
		data: PropTypes.object.isRequired,
		dispatch: PropTypes.func.isRequired,
		outgoingRegion: PropTypes.object,
		ownChildRegions: PropTypes.array,
		pathToParent: PropTypes.string.isRequired,
		timeoutDelay: PropTypes.number.isRequired,
	}

	constructor(props) {
		super(props)
		const { dispatch } = this.props;
		this.updateTransitions = bindActionCreators(actions.updateTransitions, dispatch);
	}
	
	componentDidMount() {
		const { data, timeoutDelay, isParentRegion, ownChildRegions, pathToParent } = this.props;
		
		// allows direction buttons to render
		this.updateTransitions(data, 'SET_CURRENT_REGION');
		// allows outgoing region to render
		this.updateTransitions(true, 'SET_MOVING_REGIONS');
		// affects styles for nav and direction buttons
		this.updateTransitions(data.text_colour, 'SET_TEXT_COLOUR');

		this.updateTransitions(pathToParent, 'UPDATE_CURRENT_MATCH');
		
		if (ownChildRegions && ownChildRegions.length) {
			this.updateTransitions(ownChildRegions, 'SET_CURRENT_SUB_REGIONS');
		}

		// next transition shows this Region instance as outgoing
		setTimeout(() => {
			this.updateTransitions(false, 'SET_MOVING_REGIONS');
		}, timeoutDelay);
	}

	componentWillUnmount() {
		const { data } = this.props;
		this.updateTransitions(data, 'SET_OUTGOING_REGION');
	}

	getTransitonClass = () => {
		// compare incoming and outgoing - Redux store
		const { outgoingRegion, currentRegion } = this.props;
		let transitionClass = ' js-incoming js-incoming-';

		// enter from left or right
		if (helpers.isSideways(currentRegion, outgoingRegion)) {
			transitionClass += helpers.isLeftwards(currentRegion, outgoingRegion) ? 'left' : 'right';
		// enter from top or bottom
		} else if (helpers.isVertical(currentRegion, outgoingRegion)) {
			transitionClass += helpers.isUpwards(currentRegion, outgoingRegion) ? 'top' : 'bottom';
		// fade in
		} else {
			transitionClass += 'fade';
		}
		return transitionClass;
	}

	render() {
		const { data, outgoingRegion, isMovingRegions, childRegionPaths } = this.props;
		let regionClass = 'region';
		// apply an animation 
 		if (outgoingRegion && isMovingRegions) {
 			regionClass += this.getTransitonClass();
 		}
		return (
			<Region data={data} regionClass={regionClass} />		
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

export default withRouter(connect(mapStateToProps)(IncomingRegion));
