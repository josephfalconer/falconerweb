import React, { PropTypes } from 'react';

import NavItem from './Navitem';


const Navigation = props => {
	return (
		<nav className="nav">
			<ul className="nav__menu list--plain">
				{props.pages.map((page, index) => {
					return (
						<NavItem
							key={index}
                        	title={page.title}
                        	icon={page.icon}
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
	pages: PropTypes.array.isRequired,
	onclick: PropTypes.func.isRequired,
}

export default Navigation;