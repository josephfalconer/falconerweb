import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';

import * as RegionActionCreators from '../actions/regions';


const DirectionButtons = props => {
	const { regions, regionsWidth, currentRegion, isMovingRegions } = props,
		baseClass = 'direction';

	if (regions && currentRegion) {
		const directionButtons = [
			{
				condition: currentRegion.x > 0 && currentRegion.y == 0,
				targetIndex: currentRegion.index - 1,
				className: `${baseClass} ${baseClass}--side ${baseClass}--prev`
			},
			{
				condition: currentRegion.x < (regionsWidth - 1) && currentRegion.y == 0,
				targetIndex: currentRegion.index + 1,
				className: `${baseClass} ${baseClass}--side ${baseClass}--next`
			},
			{
				condition: currentRegion.y == 0,
				targetIndex: currentRegion.index + regionsWidth,
				className: `${baseClass} ${baseClass}--vert ${baseClass}--down`
			},
			{
				condition: currentRegion.y == 1,
				targetIndex: currentRegion.index - regionsWidth,
				className: `${baseClass} ${baseClass}--vert ${baseClass}--up`
			}
		];

		return (
			<div className="directions">
				{directionButtons.map((button, index) => {
					if (button.condition) {
						return (
							<Link 
								key={index}
								to={regions[button.targetIndex].path_hash}
								onClick={e => { if (isMovingRegions) e.preventDefault(); }} 
								className={button.className}
							>
								<span className="direction__inner">
									<span className="direction__text">{regions[button.targetIndex].title}</span>
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
			</div>		
		)
	} else {
		return null
	}
}

DirectionButtons.propTypes = {
	regionsWidth: PropTypes.number.isRequired,
	regions: PropTypes.array,
	currentRegion: PropTypes.object,
	isMovingRegions: PropTypes.bool.isRequired
}

const mapStateToProps = state => (
    {	
    	regions: state.data.regions,
    	regionsWidth: state.regions.regionsWidth,
    	currentRegion: state.regions.currentRegion,
    	isMovingRegions: state.regions.isMovingRegions
    }
);

export default connect(mapStateToProps)(DirectionButtons);
