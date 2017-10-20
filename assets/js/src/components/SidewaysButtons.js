import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import DirectionButton from './DirectionButton';
import * as actions from '../actions/transitions';
import * as helpers from '../helpers';


class SidewaysButtons extends Component {

	static propTypes = {
		primaryRegions: PropTypes.array.isRequired,
		currentSubRegions: PropTypes.array.isRequired,
		currentRegion: PropTypes.object,
		isMovingRegions: PropTypes.bool.isRequired,
	}

	setButtons = () => {
		const { primaryRegions, currentRegion, currentSubRegions } = this.props;

		if (!currentRegion) {
			return [];
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

	setArrowKeys = buttons => {
		const _SidewaysButtons = this;

		document.addEventListener('keydown', (e) => {
			const { isMovingRegions } = _SidewaysButtons.props;
			let targetRegion = false;

			if (isMovingRegions)
				return

			switch(e.which) {
				case 37:
					targetRegion = buttons[0].targetRegion;
					break;

				case 39:
					targetRegion = buttons[1].targetRegion;
					break;

				default:
					false;
			}

			if (targetRegion) 
				window.location.hash = targetRegion.path_hash;

		});
	}

	render() {
		const { currentPrimaryRegion, isMovingRegions } = this.props;

		let buttons = [];
		buttons = this.setButtons();

		if (buttons.length) {
			this.setArrowKeys(buttons);
		}

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
