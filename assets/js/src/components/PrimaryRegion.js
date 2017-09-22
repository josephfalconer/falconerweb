import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link, Route } from 'react-router-dom';

import IncomingRegion from './IncomingRegion';
import * as actions from '../actions/transitions';




const DirectionButton = props => {
	return (
		<Link 
			to={`${props.matchUrl}/${props.to}`}
			onClick={e => { if (props.isMovingRegions) e.preventDefault(); }} 
			className={`direction direction--${props.name}`}
		>
			<span className="direction__inner">
				<span className="direction__text">{props.title}</span>
				<span className="direction__icon">
					<i></i>
					<i></i>
				</span>
			</span>
		</Link>
	)
}


class PrimaryRegion extends Component {

	static propTypes = {
		data: PropTypes.object.isRequired,
	}

	state = {
		subRegions: [],
		buttons: []
	}

	getSubRegions() {
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
					y: y 
				});				
			}
		}

		return currentSubRegions;
	}

	getButtons = subRegions => {
		const { data, currentRegion } = this.props;

		if (!currentRegion) {
			return [];
		}

		return [
			{
				condition: true,
				targetRegion: subRegions[currentRegion.y],
				name: 'down'
			},
			{
				condition: currentRegion.y > 0,
				targetRegion: subRegions[currentRegion.y - 2] || data,
				name: 'up'
			}
		]
	}

	render() {
		const { data, match, isMovingRegions } = this.props,
			subRegions = this.getSubRegions(),
			buttons = this.getButtons(subRegions);

		return (
			<div>
				<IncomingRegion data={data} />

				{buttons.map((button, index) => {
					if (button.targetRegion) {
						return (
							<DirectionButton
								key={index}
								matchUrl={match.url}
								to={button.targetRegion.path_hash}
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
					let hash = `/${subRegion.path_hash}`;
					return (
						<Route 
							key={index}
							// exact
							path={`${match.url}${hash}`}
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