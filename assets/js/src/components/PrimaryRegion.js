import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link, Route } from 'react-router-dom';

import IncomingRegion from './IncomingRegion';
import DirectionButton from './DirectionButton';



const replaceLocation = (matchUrl, newHash) => {
	window.location.hash = `${matchUrl}${newHash ? '/' + newHash : ''}`;
}

class PrimaryRegion extends Component {

	static propTypes = {
		data: PropTypes.object.isRequired,
	}

	setSubRegions() {
		const { subRegions, data } = this.props;
		let currentSubRegions = [],
			y = 0;

		if (!subRegions.length) {
			return [];
		}

		for (let subRegion of subRegions) {
			if (subRegion.parent_region == data.path_hash) {
				y++;
				currentSubRegions.push({ 
					...subRegion, 
					x: data.x,
					y: y 
				});				
			}
		}

		return currentSubRegions;
	}

	setButtons = subRegions => {
		const { data, currentRegion } = this.props;

		if (!currentRegion) {
			return [];
		}

		let buttons = [
			{
				condition: currentRegion.y > 0,
				targetRegion: subRegions[currentRegion.y - 2] || data,
				name: 'up'
			},
			{
				condition: true,
				targetRegion: subRegions[currentRegion.y],
				name: 'down'
			}
		]

		for (let button of buttons) {
			let targetRegion = button.targetRegion;

			if (targetRegion) {
				button.to = targetRegion === data ? false : targetRegion.path_hash;
			}
		}

		return buttons;
	}

	setScroll = buttons => {

		const _PrimaryRegion = this;

		if (!buttons.length) {
			return;
		}

		let lastDeltaY = 0;

		const scrollHandler = e => {
			const event = window.event || e, // old IE support
				deltaY = event.deltaY,
				{ match, isMovingRegions, currentRegion } = _PrimaryRegion.props;

			// see Region component - region div gets path_hash as id attr
			const regionElement = document.getElementById(currentRegion.path_hash);

			if (isMovingRegions) {
				return
			} 

			// down
			if (deltaY > lastDeltaY) {
				if (buttons[1].targetRegion) {
					replaceLocation(match.url, buttons[1].to);
				}
			
			// up
			} else {
				if (buttons[0].targetRegion && regionElement.scrollTop == 0) {
					replaceLocation(match.url, buttons[0].to);
				} 
			}

			lastDeltaY = event.deltaY;
		}

		window.onwheel = scrollHandler;
	}

	setArrowKeys = buttons => {
		const _PrimaryRegion = this;

		document.addEventListener('keydown', (e) => {
			const  { isMovingRegions, match } = this.props;

			if (isMovingRegions)
				return

			switch(e.which) {
				case 38:
					// up
					replaceLocation(match.url, buttons[0].to);
					break;

				case 40:
					// down
					replaceLocation(match.url, buttons[1].to);
					break;

				default:
					false;
			}

		});
	}

	render() {
		const { data, match, isMovingRegions, currentRegion } = this.props,
			subRegions = this.setSubRegions(),
			buttons = this.setButtons(subRegions);

		if (buttons.length) {
			this.setScroll(buttons);
			this.setArrowKeys(buttons);
		}
		
		return (
			<div>
				<Route 
					path={match.url}
					exact
					render={props => (
						<IncomingRegion data={data} />
					)}
				/>
				
				{buttons.map((button, index) => {
					let targetRegion = button.targetRegion;

					return (
						<DirectionButton
							key={index}
							matchUrl={match.url}
							to={button.to}
							isVisible={targetRegion && button.condition}
							name={button.name}
							title={targetRegion ? targetRegion.title : ''}
						/>
					)
				})}

				{subRegions.map((subRegion, index) => {
					return (
						<Route 
							key={index}
							path={`${match.url}/${subRegion.path_hash}`}
							render={props => (
								<IncomingRegion data={subRegion} match={props.match}/>
							)} 						
						/>
					)
				})}
			</div>
		)
	}
}


const mapStateToProps = state => (
    {
    	subRegions: state.data.subRegions,
    	currentRegion: state.transitions.currentRegion,
    	isMovingRegions: state.transitions.isMovingRegions
    }
);

export default connect(mapStateToProps)(PrimaryRegion);