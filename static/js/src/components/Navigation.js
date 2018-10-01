import React, { PropTypes } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Icons from './icons/Icons';

function Navigation(props) {
	const { navigationLinks, isMovingPages, currentParentPageHash } = props;
	if (navigationLinks.length) {
		return (
			<nav className='nav'>
				<ul className="nav__menu list--plain">
					{navigationLinks.map((link, index) => {
						const navItemClass = index == 0 ? 'nav__item nav__item--logo' : 'nav__item';
						const Icon = Icons[link.icon.toUpperCase()];
						const isCurrent = `${link.linked_page}` === currentParentPageHash;
						return (
							<li key={index} className={navItemClass} >
								<Link
									to={`/${link.linked_page}`}
									className={`nav__link ${isCurrent && 'nav__link--current'}`}
									onClick={e => { if (isMovingPages) e.preventDefault(); }}
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
	isMovingPages: PropTypes.bool.isRequired,
	currentParentPageHash: PropTypes.string,
}

function mapStateToProps({
	navigationLinks, 
	isMovingPages, 
	currentParentPageHash
}, props) {
	return {
		...props,
		navigationLinks,
		isMovingPages,
		currentParentPageHash,
	}
}

export default connect(mapStateToProps)(Navigation);
