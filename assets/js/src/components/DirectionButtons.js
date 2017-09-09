import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';

import * as RegionActionCreators from '../actions/transitions';


const replaceLocation = newHash => {
	const currentLocation = window.location;
	window.location = `${currentLocation.origin}/#/${newHash}`;
}


const DirectionButtons = props => {
	const { 
			primaryRegions, 
			currentSubRegions,
			currentRegion, 
			isMovingRegions, 
			regionTextColour 
		} = props,
		baseClass = 'direction';

	if (primaryRegions && currentRegion) {
		const directionButtons = [
			{
				condition: true,
				targetRegion: primaryRegions[currentRegion.index - 1],
				className: `${baseClass} ${baseClass}--side ${baseClass}--prev`
			},
			{
				condition: true,
				targetRegion: primaryRegions[currentRegion.index + 1],
				className: `${baseClass} ${baseClass}--side ${baseClass}--next`
			},
			{
				condition: true,
				targetRegion: currentSubRegions[currentRegion.y],
				className: `${baseClass} ${baseClass}--vert ${baseClass}--down`
			},
			{
				condition: currentRegion.y > 0,
				targetRegion: currentSubRegions[currentRegion.y - 2] || primaryRegions[currentRegion.x],
				className: `${baseClass} ${baseClass}--vert ${baseClass}--up`
			}
		]

		let lastDeltaY = 0;

		window.onwheel = e => {
			const event = window.event || e, // old IE support
				deltaY = event.deltaY

			const regionElement = document.getElementsByClassName('region')[0];

			if (isMovingRegions) {
				return
			} 

			if (deltaY > lastDeltaY) {
				if (directionButtons[2].targetRegion) {
					replaceLocation(directionButtons[2].targetRegion.path_hash);
				}
				
			} else {
				if (directionButtons[3].targetRegion && regionElement.scrollTop == 0) {
					replaceLocation(directionButtons[3].targetRegion.path_hash);
				} 
			}
		}

		return (
			<nav className={regionTextColour == 'dark' ? 'directions directions--background' : 'directions'}>
				{directionButtons.map((button, index) => {
					if (button.condition && button.targetRegion) {
						return (
							<Link 
								key={index}
								to={button.targetRegion.path_hash}
								onClick={e => { if (isMovingRegions) e.preventDefault(); }} 
								className={button.className}
							>
								<span className="direction__inner">
									<span className="direction__text">{button.targetRegion.title}</span>
									<span className="direction__icon">
										<i></i>
										<i></i>
									</span>
								</span>
							</Link>
						)
					} else {
						return null;
					}
				})}
			</nav>		
		)
	} else {
		return null
	}
}

DirectionButtons.propTypes = {
	primaryRegions: PropTypes.array,
	currentSubRegions: PropTypes.array.isRequired,
	currentRegion: PropTypes.object,
	isMovingRegions: PropTypes.bool.isRequired,
	regionTextColour: PropTypes.string.isRequired,
}

const mapStateToProps = state => (
    {	
    	primaryRegions: state.data.primaryRegions,
    	currentRegion: state.transitions.currentRegion,
    	isMovingRegions: state.transitions.isMovingRegions,
    	regionTextColour: state.transitions.currentTextColour,
    }
);

export default connect(mapStateToProps)(DirectionButtons);
