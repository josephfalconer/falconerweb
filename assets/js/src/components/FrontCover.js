import React, { Component, PropTypes } from 'react';

import Slider from './Slider';
import FrontCoverButtons from './FrontCoverButtons';
import Navigation from './Navigation';


const FrontCover = props => {
	return (
		<div className="frontcover">
			<Slider 
				pages={props.pages}
				currentPageIndex={props.currentPageIndex}
				sliderClass={props.sliderClass}
			/>	

			<FrontCoverButtons
				noOfPages={props.pages.length}
				currentPageIndex={props.currentPageIndex}
				changePage={props.changePage}
				slideCoverUp={props.slideCoverUp}
			/>

			<Navigation
				navigationLinks={props.navigationLinks}
				pages={props.pages}
				changePage={props.changePage}
				currentPageIndex={props.currentPageIndex}
			/>
		</div>
	);
}

FrontCover.propTypes = {
	navigationLinks: PropTypes.array.isRequired,
	pages: PropTypes.array.isRequired,
	currentPageIndex: PropTypes.number.isRequired,
	changePage: PropTypes.func.isRequired,
	sliderClass: PropTypes.string.isRequired,
	slideCoverUp: PropTypes.func.isRequired,
};

export default FrontCover;
