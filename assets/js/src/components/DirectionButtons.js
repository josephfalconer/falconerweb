import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';

import * as RegionActionCreators from '../actions/regions';


const DirectionButtons = props => {
	const { dispatch } = props,
		setRegionData = bindActionCreators(RegionActionCreators.setRegionData, dispatch),
		currentRegion = props.currentRegion,
		baseClass = 'frontcover__button frontcover__button',
		directionButtons = [
			{
				condition: currentRegion.index > 0,
				targetIndex: currentRegion.index - 1,
				className: `${baseClass}--prev`
			},
			{
				condition: currentRegion.index < 3,
				targetIndex: currentRegion.index + 1,
				className: `${baseClass}--next`
			},
			{
				condition: currentRegion.y == 0,
				targetIndex: currentRegion.index + 4,
				className: `${baseClass}--down`
			},
			{
				condition: currentRegion.y == 1,
				targetIndex: currentRegion.index - 4,
				className: `${baseClass}--up`
			}
		];

	const onClick = (e, targetIndex) => {
		if (props.isMovingView) {
			e.preventDefault();
		} else {
			props.setCurrentRegion(targetIndex);
		}
	}

	return (
		<div className="frontcover__buttons">
			{directionButtons.map((directionButton, index) => {
				if (directionButtons[index].condition) {
					return (
						<Link 
							to={props.regions[directionButtons[index].targetIndex].path_hash}
							onClick={e => { onClick(e, directionButtons[index].targetIndex); }} 
							className={directionButtons[index].className}
						>
							<span>{props.regions[directionButtons[index].targetIndex].title}</span>
						</Link>
					)
				} else {
					return null;
				}
			})}
		</div>		
	);
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
