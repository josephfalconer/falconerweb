import React, { Component, PropTypes } from 'react';

import Slider from './Slider';
import FrontCoverButtons from './FrontCoverButtons';
import Navigation from './Navigation';


class FrontCover extends Component {

	state = {
		currentViewIndex: 0,
		currentOffset: 0
	};

	static propTypes = {
		isFrontCover: PropTypes.bool.isRequired,
		pages: PropTypes.array.isRequired,
		onClick: PropTypes.func.isRequired,
	};

	componentWillMount() {
		const windowWidth = window.innerWidth;

		this.setState({
			...this.state,
			windowWidth: windowWidth
		});
	};

	moveSlider = direction => {
		const windowWidth = this.state.windowWidth;
		let currentIndex = this.state.currentViewIndex;

		currentIndex = direction == 'LEFT' ? currentIndex - 1 : currentIndex + 1;

		this.setState({
			...this.state,
			currentViewIndex: currentIndex,
			currentOffset: windowWidth * currentIndex
		});
	}

	render() {
		const pages = this.props.pages,
			widthStyle = { width: `${this.state.windowWidth}px`},
			offsetStyle = { left: `-${this.state.currentOffset}px` }; 

		return (
			<div className={this.props.isFrontCover ? 'frontcover frontcover--down' : 'frontcover'}>
				<Slider 
					pages={pages}
					widthStyle={widthStyle}
					offsetStyle={offsetStyle}
				/>	

				<FrontCoverButtons
					noOfPages={pages.length}
					currentViewIndex={this.state.currentViewIndex + 1}
					onClick={this.moveSlider}
				/>

				<Navigation 
					pages={pages}
					onClick={this.props.onClick}
				/>
			</div>
		);
	}		
}

export default FrontCover;