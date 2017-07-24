import React, { Component, PropTypes } from 'react';

import Slider from './Slider';
import FrontCoverButtons from './FrontCoverButtons';
import Navigation from './Navigation';


const FrontCover = props => {
	return (
		<div className={props.isFrontCover ? 'frontcover frontcover--down' : 'frontcover frontcover--down'}>
			<Slider 
				pages={props.pages}
				currentPageIndex={props.currentPageIndex}
			/>	

			<FrontCoverButtons
				noOfPages={props.pages.length}
				currentPageIndex={props.currentPageIndex}
				onClick={props.onClick}
			/>

			<Navigation 
				pages={props.pages}
				onClick={props.onClick}
			/>
		</div>
	);
}

FrontCover.propTypes = {
	isFrontCover: PropTypes.bool.isRequired,
	pages: PropTypes.array.isRequired,
	currentPageIndex: PropTypes.number.isRequired,
	onClick: PropTypes.func.isRequired,
};

export default FrontCover;