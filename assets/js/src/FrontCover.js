import React, { Component, PropTypes } from 'react';

import Navigation from './Navigation';

class FrontCover extends Component {

	state = {
		currentViewIndex: 0,
		currentOffset: 0
	};

	static propTypes = {
		isFrontCover: PropTypes.bool.isRequired,
		coverTitle: PropTypes.string.isRequired,
		pages: PropTypes.array.isRequired,
		onclick: PropTypes.func.isRequired,
	};

	componentWillMount() {
		const windowWidth = window.innerWidth;

		this.setState({
			...this.state,
			pageTitles: this.getPageTitles(),
			windowWidth: windowWidth
		});
	};

	getPageTitles = () => {
		let pageTitles = [];

		for (let page of this.props.pages) {
			pageTitles.push(page.title);
		}
		return pageTitles;
	};

	moveSlider = direction => {
		const windowWidth = this.state.windowWidth;
		let currentIndex = this.state.currentViewIndex;



		if (direction == 'LEFT') {
			currentIndex--;
		} else if (direction == 'RIGHT') {
			currentIndex++;
		}
		// currentIndex = direction == 'LEFT' ? currentIndex++ : currentIndex--;

		console.log(currentIndex);

		this.setState({
			...this.state,
			currentViewIndex: currentIndex,
			currentOffset: windowWidth * currentIndex
		});
	}

	render() {
		const widthStyle = { width: `${this.state.windowWidth}px`},
			offsetStyle = { left: `-${this.state.currentOffset}px` }; 

		return (
			<div className={this.props.isFrontCover ? 'frontcover frontcover--down' : 'frontcover'}>
				<div className="slider__track">
					<div className="slider" style={offsetStyle}>
						<header className="slider__slide" style={widthStyle}>
							<div className="header__content">
								<h1 className="header__title">Joseph Falconer | Web Developer</h1>
							</div>
						</header>
						{this.props.pages.map((page, index) => {
							return (
								<section className="slider__slide" key={index} style={widthStyle}>
									<div className="header__content">
										<h1 className="header__title">{page.title}</h1>
										<p>{page.description}</p>
									</div>
								</section>
							);
		                })}
					</div>
				</div>	

				<div className="frontcover__buttons">
					<button onClick={() => { this.moveSlider('LEFT'); }} className="frontcover__button frontcover__button--prev"></button>
					<button onClick={() => { this.moveSlider('RIGHT'); }} className="frontcover__button frontcover__button--next"></button>
				</div>

				{this.state.pageTitles ?
					<Navigation 
						coverTitle={this.props.coverTitle}
						pageTitles={this.state.pageTitles}
						onclick={this.props.onclick}
					/>
					:
					null
				}
			</div>
		);
	}

		
}



export default FrontCover;