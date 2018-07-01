import React, { PropTypes } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Icons from './icons/Icons';

const Navigation = props => {
	const { navigationLinks, isMovingZones, currentParentZoneHash } = props;
	if (navigationLinks.length) {
		return (
			<nav className='nav'>
				<ul className="nav__menu list--plain">
					{navigationLinks.map((link, index) => {
						const navItemClass = index == 0 ? 'nav__item nav__item--logo' : 'nav__item';
						const Icon = Icons[link.icon.toUpperCase()];
						console.log(`${link.linked_zone}`, currentParentZoneHash);
						const isCurrent = `${link.linked_zone}` === currentParentZoneHash;
						return (
							<li key={index} className={navItemClass} >
								<Link
									to={`/${link.linked_zone}`}
									className={`nav__link ${isCurrent && 'nav__link--current'}`}
									onClick={e => { if (isMovingZones) e.preventDefault(); }}
								>
									{Icon &&
										<span className="nav__linkcircle">
											<span className="nav__icon is-displayed-lg">
												<Icon />
											</span>
		                </span>
									}
	                <span className="nav__linktext is-displayed-lg">{link.text}</span>
								</Link>
							</li>
						);
					})}
				</ul>
			</nav>
		)
	}
	return null;
}

Navigation.propTypes = {
	navigationLinks: PropTypes.array.isRequired,
	isMovingZones: PropTypes.bool.isRequired,
	currentParentZoneHash: PropTypes.string,
}

function mapStateToProps({
	navigationLinks, 
	isMovingZones, 
	currentParentZoneHash
}, props) {
	return {
		...props,
		navigationLinks,
		isMovingZones,
		currentParentZoneHash,
	}
}

export default connect(mapStateToProps)(Navigation);
