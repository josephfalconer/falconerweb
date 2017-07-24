import React, { Component, PropTypes } from 'react';

import Slider from './Slider';
import FrontCoverButtons from './FrontCoverButtons';
import Navigation from './Navigation';


class FrontCover extends Component {

	static propTypes = {
		isFrontCover: PropTypes.bool.isRequired,
		pages: PropTypes.array.isRequired,
		currentPageIndex: PropTypes.number.isRequired,
		changePage: PropTypes.func.isRequired,
	};

	state = {
		isCovering: true
	};

	liftOrPullCover = isNavButton => {
		const isCovering = this.state.isCovering;

		if (!isCovering || isNavButton) {
			this.setState({
				isCovering: true
			});

		} else if (isCovering && !isNavButton){
			this.setState({
				isCovering: false
			});
		}

	};

	render() {
		return (
			<div className={this.state.isCovering ? 'frontcover frontcover--down' : 'frontcover'}>
				<Slider 
					pages={this.props.pages}
					currentPageIndex={this.props.currentPageIndex}
				/>	

				<FrontCoverButtons
					noOfPages={this.props.pages.length}
					currentPageIndex={this.props.currentPageIndex}
					changePage={this.props.changePage}
					liftOrPullCover={this.liftOrPullCover}
				/>

				<Navigation 
					pages={this.props.pages}
					changePage={this.props.changePage}
					liftOrPullCover={this.liftOrPullCover}
				/>
			</div>
		);
	}
}

export default FrontCover;
