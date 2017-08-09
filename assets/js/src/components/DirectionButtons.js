import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';

import * as RegionActionCreators from '../actions/regions';


const DirectionButtons = props => {
	const { dispatch } = props,
		setRegionData = bindActionCreators(RegionActionCreators.setRegionData, dispatch),
		currentRegion = props.currentRegion,
		baseClass = 'direction',
		directionButtons = [
			{
				condition: currentRegion.index > 0,
				targetIndex: currentRegion.index - 1,
				className: `${baseClass} ${baseClass}--side ${baseClass}--prev`
			},
			{
				condition: currentRegion.index < 3,
				targetIndex: currentRegion.index + 1,
				className: `${baseClass} ${baseClass}--side ${baseClass}--next`
			},
			{
				condition: currentRegion.y == 0,
				targetIndex: currentRegion.index + 4,
				className: `${baseClass} ${baseClass}--vert ${baseClass}--down`
			},
			{
				condition: currentRegion.y == 1,
				targetIndex: currentRegion.index - 4,
				className: `${baseClass} ${baseClass}--vert ${baseClass}--up`
			}
		];

	const onClick = (e, targetIndex) => {
		if (props.isMovingView) {
			e.preventDefault();
		} else {
			props.setCurrentRegion(targetIndex);
		}
	}

	if (props.regions.length) {		
		return (
			<div className="directions">
				{directionButtons.map((button, index) => {
					if (button.condition) {
						return (
							<Link 
								key={index}
								to={props.regions[button.targetIndex].path_hash}
								onClick={e => { onClick(e, button.targetIndex); }} 
								className={button.className}
							>
								<span className="direction__inner">
									<span className="direction__text">{props.regions[button.targetIndex].title}</span>
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
		return null;
	}

	
}

DirectionButtons.propTypes = {
	regions: PropTypes.array.isRequired,
	currentRegion: PropTypes.object.isRequired,
	setCurrentRegion: PropTypes.func.isRequired,
}

const mapStateToProps = state => (
    {
    	regions: state.data.regions,
    	currentRegion: state.regions.currentRegion,
    }
);

export default connect(mapStateToProps)(DirectionButtons);
