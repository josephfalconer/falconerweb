import React, { PropTypes } from 'react';

import IconSites from './IconSites';
import IconSkills from './IconSkills';
import IconDemos from './IconDemos';

const NavItem = props => {
	return (
		<li className="nav__item">
			<a className="nav__link" href="#" onClick={e => { props.onclick(e, props.title) }}>
				<span className="nav__linkcircle">
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
				<span className="nav__linktext">{props.title}</span>
			</a>
		</li>
	);	
}

NavItem.propTypes = {
	title: PropTypes.string.isRequired,
	onclick: PropTypes.func.isRequired,
}

export default NavItem;