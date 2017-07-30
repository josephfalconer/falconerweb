import React, { PropTypes } from 'react';


const FrontCoverButtons = props => {
	return (
		<div className="frontcover__buttons">
			{props.currentPageIndex > 0 &&
				<a 
					href="#"
					onClick={e => { props.changePage(e, props.currentPageIndex - 1); }} 
					className="frontcover__button frontcover__button--prev"
				></a>
			}
			{(props.currentPageIndex + 1 ) < props.noOfPages &&
				<a 
					href="#"
					onClick={e => { props.changePage(e, props.currentPageIndex + 1); }} 
					className="frontcover__button frontcover__button--next"
				></a>
			}
			{props.currentPageIndex > 0 &&
				<a 
					href="#"
					onClick={e => { props.slideCoverUp(); }} 
					className="frontcover__button frontcover__button--down"
				></a>
			}
		</div>
	);	
}

FrontCoverButtons.propTypes = {
	noOfPages: PropTypes.number.isRequired,
	currentPageIndex: PropTypes.number.isRequired,
	changePage: PropTypes.func.isRequired,
	slideCoverUp: PropTypes.func.isRequired,
}

export default FrontCoverButtons;