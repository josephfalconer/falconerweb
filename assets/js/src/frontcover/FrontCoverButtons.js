import React, { PropTypes } from 'react';


const FrontCoverButtons = props => {
	return (
		<div className="frontcover__buttons">
			{props.currentPageIndex > 0 &&
				<a 
					href="#"
					onClick={e => { props.onClick(e, props.currentPageIndex - 1); }} 
					className="frontcover__button frontcover__button--prev"
				></a>
			}
			{(props.currentPageIndex + 1 ) < props.noOfPages &&
				<a 
					href="#"
					onClick={e => { props.onClick(e, props.currentPageIndex + 1); }} 
					className="frontcover__button frontcover__button--next"
				></a>
			}
		</div>
	);	
}

FrontCoverButtons.propTypes = {
	noOfPages: PropTypes.number.isRequired,
	currentPageIndex: PropTypes.number.isRequired,
	onClick: PropTypes.func.isRequired
}

export default FrontCoverButtons;