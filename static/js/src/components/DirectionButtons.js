import React, { PropTypes, PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';

import DirectionButton from './DirectionButton';
import { updateStoreState } from '../actions';
import { formatVerticalPath } from '../helpers';

class DirectionButtons extends PureComponent {
	static propTypes = {
		parentZones: PropTypes.array.isRequired,
		currentZone: PropTypes.object,
		isMovingZones: PropTypes.bool.isRequired,
		currentChildZones: PropTypes.array.isRequired,
		currentParentZoneHash: PropTypes.string,
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.currentZone !== nextProps.currentZone) {
			this.props.updateStoreState({
				directionButtons: this.getButtons(nextProps)
			});
		}
		if (this.props.directionButtons !== nextProps.directionButtons) {
			document.removeEventListener('keydown', this.navigateFromKeyPress);
			document.addEventListener('keydown', this.navigateFromKeyPress);
		}
	}

	getButtons = nextProps => {
		const { parentZones, currentZone, currentChildZones } = nextProps;
		if (currentZone) {
			return [
				{
					isVisible: currentZone.x > 0 && currentZone.y === 0,
					isVertical: false,
					targetZone: parentZones[currentZone.x - 1],
					name: 'prev'
				},
				{
					isVisible: (currentZone.x + 1) < parentZones.length && currentZone.y === 0,
					isVertical: false,
					targetZone: parentZones[currentZone.x + 1],
					name: 'next'
				},
				{
					isVisible: currentZone.y > 0,
					isVertical: true,
					targetZone: currentChildZones[currentZone.y - 2] || parentZones[currentZone.x],
					name: 'up'
				},
				{
					isVisible: currentZone.y < currentChildZones.length,
					isVertical: true,
					targetZone: currentChildZones[currentZone.y],
					name: 'down'
				}
			]
		}
		return [];
	}

	navigateFromKeyPress = event => {
		const { isMovingZones, currentParentZoneHash, directionButtons } = this.props;
		if (directionButtons) {
			const button = directionButtons[this.getButtonIndexFromPressedKey(event)];
			if (button && button.isVisible && !isMovingZones) {
				const targetHash = button.targetZone.path_hash;
				const newHash = button.isVertical ? formatVerticalPath(currentParentZoneHash, targetHash) : `/${targetHash}`;
				this.props.history.push(newHash);
			}
		}
	}

	getButtonIndexFromPressedKey = event => {
		switch (event.which) {
			case 37:
				return 0;
			case 39:
				return 1;
			case 38:
				return 2;
			case 40:
				return 3;
		}
	}

	render() {
		const { isMovingZones, currentParentZoneHash, directionButtons } = this.props;
		return (
			<nav className='directions'>
				{directionButtons && directionButtons.map((button, index) => {
					return (
						<DirectionButton
							key={index}
							button={button}
							currentParentZoneHash={currentParentZoneHash}
							isMovingZones={isMovingZones}
						/>
					)
				})}
			</nav>
		)
	}
}

function mapStateToProps({
	parentZones, 
	currentZone, 
	currentChildZones,
	isMovingZones,
	currentParentZoneHash,
	directionButtons
}, props) {
	return {
		...props,
		parentZones,
		currentZone,
		currentChildZones,
		isMovingZones,
		currentParentZoneHash,
		directionButtons,
	}
}

export default withRouter(connect(mapStateToProps, {
	updateStoreState,
})(DirectionButtons));
