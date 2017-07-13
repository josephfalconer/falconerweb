import React, { PropTypes } from 'react';

import IconLogo from './IconLogo';
import IconSites from './IconSites';
import IconSkills from './IconSkills';
import IconDemos from './IconDemos';

const NavItem = props => {
	const isLogoLink = props.title == props.coverTitle,
		navItemClass = isLogoLink ? 'nav__item nav__item--logo' : 'nav__item';
	
	return (
		<li className={navItemClass}>
			<a className="nav__link" href="#" onClick={e => { props.onclick(e, props.title) }}>
				<span className="nav__linkcircle">
					{isLogoLink &&
						<IconLogo/>
					}
					{props.title == 'Sites' &&
						<IconSites/>
					}
					{props.title == 'Skills' &&
						<IconSkills/>
					}
					{props.title == 'Demos' &&
						<IconDemos/>
					}
                </span>
				<span className="nav__linktext">{!isLogoLink && props.title}</span>
			</a>
		</li>
	);	
}

NavItem.propTypes = {
	coverTitle: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	onclick: PropTypes.func.isRequired,
}

export default NavItem;