import React, { PropTypes } from 'react';

import Icons from './icons/Icons';

const NavItem = props => {
	const navItemClass = props.index == 0 ? 'nav__item nav__item--logo' : 'nav__item';

	let { [props.icon]:Icon } = Icons;
	Icon = Icon.call();
	
	return (
		<li className={navItemClass}>
			<a className="nav__link" href="#" onClick={e => { props.onClick(e, props.index) }}>
				<span className="nav__linkcircle">
					{Icon}
                </span>
				<span className="nav__linktext">{props.title}</span>
			</a>
		</li>
	);	
}

NavItem.propTypes = {
	index: PropTypes.number.isRequired,
	title: PropTypes.string.isRequired,
	icon: PropTypes.string.isRequired,
	onClick: PropTypes.func.isRequired,
}

export default NavItem;