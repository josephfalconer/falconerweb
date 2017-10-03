import React, { PropTypes } from 'react';
import { Link } from 'react-router-dom';


const DirectionButton = props => {
	return (
		<Link 
			to={`${props.matchUrl}${props.to ? '/' + props.to : ''}`}
			onClick={e => { if (props.isMovingRegions) e.preventDefault(); }} 
			className={`direction direction--${props.name}`}
		>
			<span className="direction__inner">
				<span className="direction__text">{props.title}</span>
				<span className="direction__icon">
					<i></i>
					<i></i>
				</span>
			</span>
		</Link>
	)
}

export default DirectionButton;