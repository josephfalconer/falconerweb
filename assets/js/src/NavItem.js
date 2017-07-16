import React, { PropTypes } from 'react';

import IconLogo from './IconLogo';
import IconProjects from './IconProjects';
import IconSkills from './IconSkills';
import IconDemos from './IconDemos';

const icons = {
	logo: () => {
		return <IconLogo/>;
	},
	skills: () => {
		return <IconSkills/>;
	},
	projects: () => {
		return <IconProjects/>;
	},
	demos: () => {
		return <IconDemos/>;
	}
}

const NavItem = props => {
	const isLogoLink = props.title == props.coverTitle,
		navItemClass = isLogoLink ? 'nav__item nav__item--logo' : 'nav__item';

	let icon = icons[props.icon]
	icon = icon.call();
	
	return (
		<li className={navItemClass}>
			<a className="nav__link" href="#" onClick={e => { props.onclick(e, props.title) }}>
				<span className="nav__linkcircle">
					{icon}
                </span>
				<span className="nav__linktext">{!isLogoLink && props.title}</span>
			</a>
		</li>
	);	
}

NavItem.propTypes = {
	coverTitle: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	icon: PropTypes.string.isRequired,
	onclick: PropTypes.func.isRequired,
}

export default NavItem;