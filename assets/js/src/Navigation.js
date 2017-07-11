import React, { PropTypes } from 'react';

import NavItem from './Navitem';


const Navigation = props => {
	return (
		<nav className="nav">
			<a href="#" onClick={e => { props.onclick(e) }}>LOGO</a>
			<ul className="nav__menu list--plain">
				{props.pageTitles.map(function(pageTitle, index) {
					return (
						<NavItem
							key={index}
                        	title={pageTitle}
                        	onclick={props.onclick}
                        /> 
					);
                }.bind(this))}
			</ul>
		</nav>
	)
}

Navigation.propTypes = {
	pageTitles: PropTypes.array.isRequired,
	onclick: PropTypes.func.isRequired,
}

export default Navigation;