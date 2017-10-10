import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link, Route } from 'react-router-dom';

import IncomingRegion from './IncomingRegion';
import DirectionButton from './DirectionButton';
import * as actions from '../actions/transitions';



const replaceLocation = newHash => {
	const currentLocation = window.location;
	window.location = `${currentLocation.origin}/#/${newHash}`;
}

const setScroll = buttons => {

	let lastDeltaY = 0;

	const scrollHandler = e => {
		const event = window.event || e, // old IE support
			deltaY = event.deltaY;
			// { isMovingRegions } = this.props;

		// const regionElement = document.getElementsByClassName('region')[0];

		// console.log(regionElement);

		// if (isMovingRegions) {
		// 	return
		// } 

		if (deltaY > lastDeltaY) {
			if (buttons[0].targetRegion) {
				replaceLocation(buttons[0].targetRegion.path_hash);
			}
			
		} else {
			//  && regionElement.scrollTop == 0
			if (buttons[1].targetRegion) {
				replaceLocation(buttons[1].targetRegion.path_hash);
			} 
		}

		lastDeltaY = event.deltaY;
	}

	window.onwheel = scrollHandler;
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
			if (subRegion.parent_region == data.title) {
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

		return [
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
	}

	render() {
		const { data, match, isMovingRegions, currentRegion } = this.props,
			subRegions = this.setSubRegions(),
			buttons = this.setButtons(subRegions);

		// if (buttons.length) {
		// 	setScroll(buttons);
		// }
		
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
					let targetRegion = button.targetRegion,
						to = false;

					if (targetRegion) {
						to = targetRegion === data ? false : targetRegion.path_hash;
					}

					return (
						<DirectionButton
							key={index}
							matchUrl={match.url}
							to={to}
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