import React, { PropTypes } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import Icons from './icons/Icons';


const Navigation = props => {
	const { navigationLinks, isMovingRegions, currentMatch } = props;

	if (navigationLinks.length) {
		return (
			<nav className='nav'>
				<ul className="nav__menu list--plain">
					{navigationLinks.map((link, index) => {
						
						const navItemClass = index == 0 ? 'nav__item nav__item--logo' : 'nav__item',
							Icon = Icons[link.icon.toUpperCase()],
							isCurrent = `/${link.linked_region}` === currentMatch;

						return (
							<li key={index} className={navItemClass} >
								<NavLink
									to={`/${link.linked_region}`}
									className={`nav__link ${isCurrent && 'nav__link--current'}`}
									exact
									onClick={e => { if (isMovingRegions) e.preventDefault(); }}
								>
									{Icon &&
										<span className="nav__linkcircle">
											<span className="nav__icon is-displayed-lg">{Icon()}</span>
						                </span>
									}
									
					                <span className="nav__linktext is-displayed-lg">{link.text}</span>
								</NavLink>
							</li>
						);
					})}
				</ul>
			</nav>
		)
	} else {
		return null;
	}
	
}

Navigation.propTypes = {
	navigationLinks: PropTypes.array.isRequired,
	isMovingRegions: PropTypes.bool.isRequired,
	currentMatch: PropTypes.string,
}

const mapStateToProps = state => (
    {
    	navigationLinks: state.data.navigationLinks,
    	isMovingRegions: state.transitions.isMovingRegions,
    	currentMatch: state.transitions.currentMatch,
    }
);

export default connect(mapStateToProps)(Navigation);