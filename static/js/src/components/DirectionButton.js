import React, { PropTypes } from 'react';
import { Link } from 'react-router-dom';

import { formatHash } from '../helpers';


const DirectionButton = props => {
	const {
		button,
		parentPathHash,
		isMovingZones
	} = props;
	const { targetZone } = button;
	const visibiltyClass = `js-${button.isVisible && !isMovingZones ? 'visible' : 'hidden'}-button`;
	let linkTo = '';
	if (button.isVisible && targetZone) {
		console.log(parentPathHash);
		linkTo = button.isParentChild ? formatHash(targetZone.path_hash, parentPathHash) : targetZone.path_hash;
	}
	return (
		<Link
			to={linkTo}
			className={`direction direction--${button.name} ${visibiltyClass}`}
		>
			<span className="direction__inner">
				<span className="direction__text is-displayed-lg">{button.isVisible ? targetZone.title : null}</span>
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
	parentPathHash: PropTypes.string.isRequired,
}

DirectionButton.defaultProps = {
	isMovingZones: false,
}

export default DirectionButton;
