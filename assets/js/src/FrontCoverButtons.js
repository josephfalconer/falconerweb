import React, { PropTypes } from 'react';


const FrontCoverButtons = props => {
	return (
		<div className="frontcover__buttons">
			{props.currentViewIndex > 1 &&
				<button 
					onClick={() => { props.onClick('LEFT'); }} 
					className="frontcover__button frontcover__button--prev"
				></button>
			}
			{props.currentViewIndex < props.noOfPages &&
				<button 
					onClick={() => { props.onClick('RIGHT'); }} 
					className="frontcover__button frontcover__button--next"
				></button>
			}
		</div>
	);	
}

FrontCoverButtons.propTypes = {
	noOfPages: PropTypes.number.isRequired,
	currentViewIndex: PropTypes.number.isRequired,
	onClick: PropTypes.func.isRequired
}

export default FrontCoverButtons;