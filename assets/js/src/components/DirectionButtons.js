import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';

import * as TransitionActionCreators from '../actions/transitions';


const transitionSelectors = {
	prev: {
		outgoing: 'js-outgoing-right',
		incoming: 'js-incoming-left'
	},
	up: {
		outgoing: 'js-outgoing-bottom',
		incoming: 'js-incoming-top'
	},
	next: {
		outgoing: 'js-outgoing-left',
		incoming: 'js-incoming-right'
	},
	down: {
		outgoing: 'js-outgoing-top',
		incoming: 'js-incoming-bottom'
	}
}

const replaceLocation = newHash => {
	const currentLocation = window.location;
	window.location = `${currentLocation.origin}/#/${newHash}`;
}


class DirectionButtons extends Component {

	static propTypes = {
		primaryRegions: PropTypes.array,
		currentSubRegions: PropTypes.array.isRequired,
		currentRegion: PropTypes.object,
		isMovingRegions: PropTypes.bool.isRequired,
		regionTextColour: PropTypes.string.isRequired,
	}

	state = {
		buttons: []
	}

	componentDidMount() {
		this.updateButtons();
		this.handleOnWheel();
	}

	componentWillReceiveProps() {
		this.updateButtons();
	}

	updateButtons = () => {
		const { primaryRegions, currentRegion, currentSubRegions } = this.props;

		if (!currentRegion) {
			return;
		}

		this.setState({
			buttons: [
				{
					condition: true,
					targetRegion: primaryRegions[currentRegion.index - 1],
					name: 'prev'
				},
				{
					condition: true,
					targetRegion: primaryRegions[currentRegion.index + 1],
					name: 'next'
				},
				{
					condition: true,
					targetRegion: currentSubRegions[currentRegion.y],
					name: 'down'
				},
				{
					condition: currentRegion.y > 0,
					targetRegion: currentSubRegions[currentRegion.y - 2] || primaryRegions[currentRegion.x],
					name: 'up'
				}
			]
		});
	}

	handleOnWheel = () => {
		let lastDeltaY = 0;

		window.onwheel = e => {
			const event = window.event || e, // old IE support
				deltaY = event.deltaY,
				{ buttons } = this.state,
				{ isMovingRegions } = this.props;

			const regionElement = document.getElementsByClassName('region')[0];

			if (isMovingRegions) {
				return
			} 

			if (deltaY > lastDeltaY) {
				if (buttons[2].targetRegion) {
					replaceLocation(buttons[2].targetRegion.path_hash);
				}
				
			} else {
				if (buttons[3].targetRegion && regionElement.scrollTop == 0) {
					replaceLocation(buttons[3].targetRegion.path_hash);
				} 
			}
		}
	}

	directionClick = (e, name) => {
		const { dispatch, isMovingRegions } = this.props,
			updateTransitions = bindActionCreators(TransitionActionCreators.updateTransitions, dispatch);

		if (isMovingRegions) {
			e.preventDefault();
			return;
		}

		updateTransitions(transitionSelectors[name], 'SET_CLASS_SELECTORS');
	}

	render() {
		const { isMovingRegions, regionTextColour } = this.props,
			{ buttons } = this.state;

		return (
			<nav className={regionTextColour == 'dark' ? 'directions directions--background' : 'directions'}>
				{buttons.map((button, index) => {
					if (button.condition && button.targetRegion) {
						return (
							<Link 
								key={index}
								to={button.targetRegion.path_hash}
								onClick={e => { this.directionClick(e); }} 
								className={`direction direction--${button.name}`}
							>
								<span className="direction__inner">
									<span className="direction__text">{button.targetRegion.title}</span>
									<span className="direction__icon">
										<i></i>
										<i></i>
									</span>
								</span>
							</Link>
						)
					} else {
						return null;
					}
				})}
			</nav>	
		)
	}
	
}


const mapStateToProps = state => (
    {	
    	primaryRegions: state.data.primaryRegions,
    	currentRegion: state.transitions.currentRegion,
    	isMovingRegions: state.transitions.isMovingRegions,
    	regionTextColour: state.transitions.currentTextColour
    }
);

export default connect(mapStateToProps)(DirectionButtons);
