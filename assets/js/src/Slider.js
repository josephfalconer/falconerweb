import React, { PropTypes } from 'react';


const Slider = props => {
	return (
		<div className="slider__track">
			<div className="slider" style={props.offsetStyle}>
				{props.pages.map((page, index) => {
					return (
						<section className="slider__slide text" key={index} style={props.widthStyle}>
							<article className="header__content">
								<h1 className="header__title">{page.title}</h1>
								<p>{page.description}</p>
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
	widthStyle: PropTypes.object.isRequired,
	offsetStyle: PropTypes.object.isRequired
}

export default Slider;