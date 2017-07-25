import React, { Component, PropTypes } from 'react';

import Slider from './Slider';
import FrontCoverButtons from './FrontCoverButtons';
import Navigation from './Navigation';


class FrontCover extends Component {

	static propTypes = {
		pages: PropTypes.array.isRequired,
		currentPageIndex: PropTypes.number.isRequired,
		changePage: PropTypes.func.isRequired,
		sliderClass: PropTypes.string.isRequired,
		slideCoverUp: PropTypes.func.isRequired,
	};

	state = {
		
	};

	render() {
		return (
			<div className="frontcover">
				<Slider 
					pages={this.props.pages}
					currentPageIndex={this.props.currentPageIndex}
					sliderClass={this.props.sliderClass}
				/>	

				<FrontCoverButtons
					noOfPages={this.props.pages.length}
					currentPageIndex={this.props.currentPageIndex}
					changePage={this.props.changePage}
					slideCoverUp={this.props.slideCoverUp}
				/>

				<Navigation 
					pages={this.props.pages}
					changePage={this.props.changePage}
				/>
			</div>
		);
	}
}

export default FrontCover;
