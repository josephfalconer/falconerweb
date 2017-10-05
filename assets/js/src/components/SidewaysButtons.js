import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import DirectionButton from './DirectionButton';


const replaceLocation = newHash => {
	const currentLocation = window.location;
	window.location = `${currentLocation.origin}/#/${newHash}`;
}

class SidewaysButtons extends Component {

	static propTypes = {
		primaryRegions: PropTypes.array.isRequired,
		currentSubRegions: PropTypes.array.isRequired,
		currentRegion: PropTypes.object,
		isMovingRegions: PropTypes.bool.isRequired,
	}

	componentDidMount() {
		this.handleOnWheel();
	}

	setButtons = () => {
		const { primaryRegions, currentRegion, currentSubRegions } = this.props;

		if (!currentRegion) {
			return;
		}

		return [
			{
				condition: true,
				targetRegion: primaryRegions[currentRegion.index - 1],
				name: 'prev'
			},
			{
				condition: true,
				targetRegion: primaryRegions[currentRegion.index + 1],
				name: 'next'
			}
		]
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

	render() {
		const { currentPrimaryRegion, isMovingRegions } = this.props;

		let buttons = [];
		buttons = this.setButtons();

		return (
			<nav className='directions'>
				{buttons && buttons.map((button, index) => {
					let targetRegion = button.targetRegion;

					return (
						<DirectionButton
							key={index}
							to={targetRegion ? targetRegion.path_hash : ''}
							isVisible={targetRegion && button.condition}
							name={button.name}
							title={targetRegion ? targetRegion.title : ''}
						/>
					)
				})}
			</nav>	
		)
	}
	
}


const mapStateToProps = state => (
    {	
    	primaryRegions: state.data.primaryRegions,
    	currentPrimaryRegion: state.transitions.currentPrimaryRegion,
    	currentSubRegions: state.transitions.currentSubRegions,
    	currentRegion: state.transitions.currentRegion,
    	isMovingRegions: state.transitions.isMovingRegions,
    }
);

export default connect(mapStateToProps)(SidewaysButtons);
