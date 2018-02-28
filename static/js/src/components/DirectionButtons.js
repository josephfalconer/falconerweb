import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import DirectionButton from './DirectionButton';
import * as actions from '../actions/transitions';
import { formatHash } from '../helpers';


class DirectionButtons extends Component {
	static propTypes = {
		parentZones: PropTypes.array.isRequired,
		currentZone: PropTypes.object,
		isMovingZones: PropTypes.bool.isRequired,
		currentChildZones: PropTypes.array.isRequired,
		currentMatch: PropTypes.string,
	}

	componentDidMount() {
		// allow time for currentChildZones to reach Redux store
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
		const { parentZones, currentZone, currentChildZones } = this.props;
		if (currentZone) {
			return [
				{
					isVisible: currentZone.x > 0 && currentZone.y === 0,
					matchUrl: false,
					targetZone: parentZones[currentZone.index - 1],
					name: 'prev'
				},
				{
					isVisible: (currentZone.x + 1) < parentZones.length && currentZone.y === 0,
					matchUrl: false,
					targetZone: parentZones[currentZone.index + 1],
					name: 'next'
				},
				{
					isVisible: currentZone.y > 0,
					matchUrl: true,
					targetZone: currentChildZones[currentZone.y - 2] || parentZones[currentZone.x],
					name: 'up'
				},
				{
					isVisible: currentZone.y < currentChildZones.length,
					matchUrl: true,
					targetZone: currentChildZones[currentZone.y],
					name: 'down'
				}
			]
		}
		return [];
	}

	setArrowKeys = e => {
		if (this.buttons.length) {
			const { isMovingZones, currentMatch } = this.props;
			const buttonIndexes = {
				37: 0,
				39: 1,
				38: 2,
				40: 3
			}
			const button = this.buttons[buttonIndexes[e.which]];

			if (!button || !button.isVisible || isMovingZones) {
				return;
			}

			const targetHash = button.targetZone.path_hash;
			const newHash = button.matchUrl ? formatHash(targetHash, currentMatch) : targetHash;
			window.location.hash = newHash;
		}
	}

	render() {
		const { isMovingZones, currentMatch } = this.props;
		return (
			<nav className='directions'>
				{this.buttons && this.buttons.map((button, index) => {
					return (
						<DirectionButton
							key={index}
							button={button}
							currentMatch={currentMatch}
							isMovingZones={isMovingZones}
						/>
					)
				})}
			</nav>
		)
	}
}

const mapStateToProps = state => (
    {
    	parentZones: state.data.parentZones,
    	currentZone: state.transitions.currentZone,
    	currentChildZones: state.transitions.currentChildZones,
    	isMovingZones: state.transitions.isMovingZones,
    	currentMatch: state.transitions.currentMatch,
    }
);

export default connect(mapStateToProps)(DirectionButtons);
