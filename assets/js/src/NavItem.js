import React, { PropTypes } from 'react';

const NavItem = props => {
	return (
		<li>
			<a href="#">{props.title}</a>
		</li>
	);
}

NavItem.propTypes = {
	title: PropTypes.string.isRequired,
}

export default NavItem;