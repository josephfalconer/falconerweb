import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import DirectionButton from './DirectionButton';
import * as actions from '../actions/transitions';
import * as helpers from '../helpers';


class DirectionButtons extends Component {

	static propTypes = {
		primaryRegions: PropTypes.array.isRequired,
		currentRegion: PropTypes.object,
		isMovingRegions: PropTypes.bool.isRequired,
		currentSubRegions: PropTypes.array.isRequired,
		currentMatch: PropTypes.string,
	}

	componentDidMount() {
		// allow time for currentSubRegions to reach Redux store
		setTimeout(() => {
			this.buttons = this.setButtons();
		}, 200);
	}

	componentWillReceiveProps() {
		// refresh buttons and arrow key listener
		this.buttons = this.setButtons();
		document.removeEventListener('keydown', this.setArrowKeys);
		document.addEventListener('keydown', this.setArrowKeys);
	}

	setButtons = () => {
		const { 
			primaryRegions, 
			currentRegion,
			currentSubRegions
		} = this.props;

		if (!currentRegion) return [];

		return [
			{
				isVisible: currentRegion.x > 0 && currentRegion.y === 0,
				matchUrl: false,
				targetRegion: primaryRegions[currentRegion.index - 1],
				name: 'prev'
			},
			{
				isVisible: (currentRegion.x + 1) < primaryRegions.length && currentRegion.y === 0,
				matchUrl: false,
				targetRegion: primaryRegions[currentRegion.index + 1],
				name: 'next'
			},
			{
				isVisible: currentRegion.y > 0,
				matchUrl: true,
				targetRegion: currentSubRegions[currentRegion.y - 2] || primaryRegions[currentRegion.x],
				name: 'up'
			},
			{
				isVisible: currentRegion.y < currentSubRegions.length,
				matchUrl: true,
				targetRegion: currentSubRegions[currentRegion.y],
				name: 'down'
			}
		]
	}

	setArrowKeys = e => {
		if (!this.buttons.length) return;

		const { isMovingRegions, currentMatch } = this.props;
		
		const buttonIndexes = {
			37: 0,
			39: 1,
			38: 2,
			40: 3
		}

		const button = this.buttons[buttonIndexes[e.which]];

		if (!button || !button.isVisible || isMovingRegions)
			return;

		window.location.hash = helpers.formatNewHash(
			button.targetRegion.path_hash, 
			button.matchUrl, 
			currentMatch
		);
	}

	render() {
		const { isMovingRegions, currentMatch } = this.props;
		
		return (
			<nav className='directions'>
				{this.buttons && this.buttons.map((button, index) => {
					return (
						<DirectionButton
							key={index}
							button={button}
							currentMatch={currentMatch}
							isMovingRegions={isMovingRegions}
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
    	currentRegion: state.transitions.currentRegion,
    	isMovingRegions: state.transitions.isMovingRegions,
    	currentSubRegions: state.transitions.currentSubRegions,
    	currentMatch: state.transitions.currentMatch,
    }
);

export default connect(mapStateToProps)(DirectionButtons);
