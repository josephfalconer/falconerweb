import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import DirectionButton from './DirectionButton';


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
