import React, { PropTypes } from 'react';

import Icons from './icons/Icons';


const Slider = props => {

	const windowWidth = window.innerWidth,
		currentOffset = windowWidth * props.currentPageIndex;

	const widthValue = `${windowWidth}px`,
		offsetStyle = { left: `-${currentOffset}px` };

	return (
		<div className="slider__track">
			<div className={props.sliderClass} style={offsetStyle}>
				{props.pages.map((page, index) => {

					let { [page.icon]:Icon } = Icons; 

					let backgroundStyleUrl = `static/backgrounds/${page.background}`;
					let slideStyle = {
						width: widthValue,
						backgroundImage: `url(${backgroundStyleUrl})`
					};

					Icon = Icon.call();

					return (
						<section className="slider__slide text" key={index} style={slideStyle}>
							<article className="slider__slideinner">
								<figure className="slider__icon">{Icon}</figure>
								<div className="slider__textcontent">
									<h1 className="slider__heading">{page.title}</h1>
									<p className="slider__intro">{page.description}</p>
								</div>
							</article>
						</section>
					);
                })}
			</div>
		</div>
	);	
}

Slider.propTypes = {
	pages: PropTypes.array.isRequired,
	currentPageIndex: PropTypes.number.isRequired,
	sliderClass: PropTypes.string.isRequired,
}

export default Slider;