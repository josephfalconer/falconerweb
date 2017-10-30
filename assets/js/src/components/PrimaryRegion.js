import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link, Route } from 'react-router-dom';

import IncomingRegion from './IncomingRegion';
import DirectionButton from './DirectionButton';



const replaceLocation = (matchUrl, newHash) => {
	window.location.hash = `${matchUrl}${newHash ? '/' + newHash : ''}`;
}

class PrimaryRegion extends Component {

	constructor(props) {
		super(props);

		this.buttons = [];
	}

	static propTypes = {
		data: PropTypes.object.isRequired,
	}

	componentWillUnmount() {
		// don't need this accumulating with other PrimaryRegion instances
		document.removeEventListener('keydown', this.arrowKeyHandler);
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

		// console.log(currentRegion.y, subRegions.length);

		let buttons = [
			{
				condition: currentRegion.y > 0,
				targetRegion: subRegions[currentRegion.y - 2] || data,
				name: 'up'
			},
			{
				condition: currentRegion.y < subRegions.length,
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

	wheelHandler = e => {
		const event = window.event || e, // old IE support
			deltaY = event.deltaY,
			{ buttons } = this,
			{ match, isMovingRegions, currentRegion } = this.props;

		// see Region component - region div gets path_hash as id attr
		const regionElement = document.getElementById(currentRegion.path_hash);

		if (isMovingRegions) {
			return
		} 

		// down
		if (deltaY > 0 && buttons[1].condition) {
			replaceLocation(match.url, buttons[1].to);
		} 

		// up
		if (deltaY < 0 && buttons[0].condition) {
			if (regionElement.scrollTop == 0)
				replaceLocation(match.url, buttons[0].to);
		}
	}

	arrowKeyHandler = e => {
		const  { isMovingRegions, match } = this.props,
			{ buttons } = this;

		if (isMovingRegions)
			return

		switch(e.which) {
			case 38:
				// up
				const to = buttons[0].to ? buttons[0].to : '';
				replaceLocation(match.url, to);
				break;

			case 40:
				// down
				if (buttons[1].to) 
					replaceLocation(match.url, buttons[1].to);
				break;

			default:
				false;
		}
	}

	render() {
		const { data, match, isMovingRegions, currentRegion } = this.props,
			subRegions = this.setSubRegions(),
			buttons = this.setButtons(subRegions);

		if (buttons.length) {
			this.buttons = buttons;
			window.onwheel = this.wheelHandler;
			document.addEventListener('keydown', this.arrowKeyHandler);
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