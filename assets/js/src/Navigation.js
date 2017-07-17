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
							index={index}
                        	title={page.title}
                        	icon={page.icon}
                        	onClick={props.onClick}
                        /> 
					);
                })}
			</ul>
		</nav>
	)
}

Navigation.propTypes = {
	pages: PropTypes.array.isRequired,
	onClick: PropTypes.func.isRequired,
}

export default Navigation;