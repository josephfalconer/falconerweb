import React, { PropTypes } from 'react';
import { Link } from 'react-router-dom';

import * as helpers from '../helpers';


const DirectionButton = props => {
	const { 
			button,
			currentMatch,
			isMovingRegions
		} = props,
		{ targetRegion } = button,
		visibiltyClass = `js-${button.isVisible && !isMovingRegions ? 'visible' : 'hidden'}-button`;
	
	let newHash = helpers.formatNewHash(
		targetRegion ? targetRegion.path_hash : '', 
		button.matchUrl, 
		currentMatch
	);
			
	return (
		<Link 
			to={newHash}
			className={`direction direction--${button.name} ${visibiltyClass}`}
		>
			<span className="direction__inner">
				<span className="direction__text is-displayed-lg">{targetRegion ? targetRegion.title : null}</span>
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
	isMovingRegions: PropTypes.bool.isRequired,
	currentMatch: PropTypes.string.isRequired,
}

DirectionButton.defaultProps = {
	isMovingRegions: false,
}

export default DirectionButton;
