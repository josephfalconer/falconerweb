import React, { PropTypes } from 'react';

import NavItem from './Navitem';


const Navigation = props => {
	return (
		<nav className="nav">
			<ul className="nav__menu list--plain">
				{props.pageTitles.map((pageTitle, index) => {
					return (
						<NavItem
							key={index}
                        	title={pageTitle}
                        	onclick={props.onclick}
                        	coverTitle={props.coverTitle}
                        /> 
					);
                })}
			</ul>
		</nav>
	)
}

Navigation.propTypes = {
	coverTitle: PropTypes.string.isRequired,
	pageTitles: PropTypes.array.isRequired,
	onclick: PropTypes.func.isRequired,
}

export default Navigation;