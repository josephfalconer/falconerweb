import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as RegionActionCreators from '../actions/regions';


const FrontCoverButtons = props => {
	const isMovingView = props.isMovingView,
		{ dispatch } = props,
		setRegionData = bindActionCreators(RegionActionCreators.setRegionData, dispatch);

	const onClick = (e, index) => {
		e.preventDefault();

		if (!isMovingView) props.setCurrentRegion(index);
	}

	return (
		<div className="frontcover__buttons">
			{props.currentRegionIndex > 0 &&
				<a 
					href="#"
					onClick={e => { onClick(e, props.currentRegionIndex - 1); }} 
					className="frontcover__button frontcover__button--prev"
				></a>
			}
			{(props.currentRegionIndex + 1 ) < props.noOfRegions &&
				<a 
					href="#"
					onClick={e => { onClick(e, props.currentRegionIndex + 1); }} 
					className="frontcover__button frontcover__button--next"
				></a>
			}
			{props.currentRegionIndex > 0 &&
				<a 
					href="#"
					// onClick={e => { props.slideCoverUp(); }} 
					className="frontcover__button frontcover__button--down"
				></a>
			}
		</div>
	);	
}

FrontCoverButtons.propTypes = {
	noOfRegions: PropTypes.number.isRequired,
	currentRegionIndex: PropTypes.number.isRequired,
	setCurrentRegion: PropTypes.func.isRequired,
}

const mapStateToProps = state => (
    {
    	noOfRegions: state.data.regions.length,
    	currentRegionIndex: state.regions.currentRegion.i,
    }
);

export default connect(mapStateToProps)(FrontCoverButtons);
