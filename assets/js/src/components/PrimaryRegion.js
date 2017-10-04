import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link, Route } from 'react-router-dom';

import IncomingRegion from './IncomingRegion';
import DirectionButton from './DirectionButton';
import * as actions from '../actions/transitions';


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
					if (button.targetRegion && button.condition) {

						let to = button.targetRegion === data ? false : button.targetRegion.path_hash;

						return (
							<DirectionButton
								key={index}
								matchUrl={match.url}
								to={to}
								name={button.name}
								title={button.targetRegion.title}
								isMovingRegions={isMovingRegions}
							/>
						)
					} else {
						return null;
					}
					
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