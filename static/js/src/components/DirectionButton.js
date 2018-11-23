import React, { PropTypes } from 'react';
import { Link } from 'react-router-dom';

import { formatVerticalPath } from '../helpers';


const DirectionButton = props => {
	const {
		button,
		currentParentPageSlug,
		isMovingPages
	} = props;
	const { targetPage } = button;
	const visibiltyClass = 
		`js-${button.isVisible && !isMovingPages ? 
			'visible' : 
			'hidden'}-button`;
	let linkTo = '';
	if (button.isVisible && targetPage) {
		linkTo = button.isVertical ? formatVerticalPath(currentParentPageSlug, targetPage.slug) : targetPage.slug;
	}
	return (
		<Link
			to={linkTo}
			className={`direction direction--${button.name} ${visibiltyClass}`}
		>
			<span className="direction__inner">
				<span className="direction__text is-displayed-lg">{button.isVisible ? targetPage.title : null}</span>
				<span className="direction__icon">
					<i></i>
					<i></i>
				</span>
			</span>
		</Link>
	)
}

DirectionButton.propTypes = {
	button: PropTypes.object.isRequired,
	isMovingPages: PropTypes.bool.isRequired,
	currentParentPageSlug: PropTypes.string.isRequired,
}

DirectionButton.defaultProps = {
	isMovingPages: false,
}

export default DirectionButton;
