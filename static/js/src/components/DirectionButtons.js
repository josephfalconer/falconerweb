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
		const { parentZones, currentZone } = nextProps;
		const currentChildZones = nextProps.currentZone.is_child_zone ?
			nextProps.parentZones[nextProps.currentZone.x].child_zones:
			nextProps.currentZone.child_zones;
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
		const {
			isMovingZones,
			currentParentZoneHash,
			directionButtons,
			history,
			currentZoneScrollWrapper
		} = this.props;
		if (directionButtons) {
			const button = directionButtons[this.getButtonIndexFromPressedKey(event)];
			if ((button && button.isVisible) && !isMovingZones) {
				const targetHash = button.targetZone.path_hash;
				const newHash = button.isVertical ? formatVerticalPath(currentParentZoneHash, targetHash) : `/${targetHash}`;
				if (this.isGoodToPush(button)) {
					history.push(newHash);
				} else {
					currentZoneScrollWrapper.focus();
				}
			}
		}
	}

	isGoodToPush = button => {
		const { currentZoneScrollWrapper } = this.props;
		if (button.isVertical) {
			if (button.name === 'up' && currentZoneScrollWrapper.scrollTop > 0) {
				return false;
			}
			if (button.name === 'down') {
				const maxScrollDownPosition = currentZoneScrollWrapper.scrollHeight - currentZoneScrollWrapper.offsetHeight;
				if (maxScrollDownPosition - currentZoneScrollWrapper.scrollTop > 0) {
					return false;
				}
			}
		}
		return true;
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
	isMovingZones,
	currentParentZoneHash,
	directionButtons,
	currentZoneScrollWrapper
}, props) {
	return {
		...props,
		parentZones,
		currentZone,
		isMovingZones,
		currentParentZoneHash,
		directionButtons,
		currentZoneScrollWrapper
	}
}

export default withRouter(connect(mapStateToProps, {
	updateStoreState,
})(DirectionButtons));
