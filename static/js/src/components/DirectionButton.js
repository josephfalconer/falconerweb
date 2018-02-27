import React, { PropTypes } from 'react';
import { Link } from 'react-router-dom';

import { formatHash } from '../helpers';


const DirectionButton = props => {
	const { 
		button,
		currentMatch,
		isMovingZones
	} = props;
	const { targetRegion } = button;
	const visibiltyClass = `js-${button.isVisible && !isMovingZones ? 'visible' : 'hidden'}-button`;
	const targetHash = targetRegion ? targetRegion.path_hash : '';
	const linkTo = button.matchUrl ? formatHash(targetHash, currentMatch) : targetHash;
			
	return (
		<Link 
			to={linkTo}
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
	isMovingZones: PropTypes.bool.isRequired,
	currentMatch: PropTypes.string.isRequired,
}

DirectionButton.defaultProps = {
	isMovingZones: false,
}

export default DirectionButton;
