import React, { PropTypes } from 'react';

const NavItem = props => {
	if (props.title == "Welcome") {
		return false;
	} else {
		return (
			<li>
				<a href="#" onClick={e => { props.onclick(e, props.title) }}>{props.title}</a>
			</li>
		);
	}
	
}

NavItem.propTypes = {
	title: PropTypes.string.isRequired,
	onclick: PropTypes.func.isRequired,
}

export default NavItem;