import React, { PropTypes } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import Icons from './icons/Icons';


const Navigation = props => {
	const { navigationLinks, isMovingRegions } = props;

	if (navigationLinks.length) {
		return (
			<nav className='nav'>
				<ul className="nav__menu list--plain">
					{navigationLinks.map((link, index) => {
						
						let navItemClass = index == 0 ? 'nav__item nav__item--logo' : 'nav__item',
							hash = `/${link.linked_region}`,
							{ [link.icon]:Icon } = Icons;

						Icon = Icon.call();

						return (
							<li key={index} className={navItemClass} >
								<NavLink
									to={hash}
									className="nav__link"
									activeClassName="nav__link nav__link--current"
									exact
									onClick={e => { if (isMovingRegions) e.preventDefault(); }}
								>
									<span className="nav__linkcircle">
										<span className="nav__icon is-displayed-lg">{Icon}</span>
										
					                </span>
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
}

const mapStateToProps = state => (
    {
    	navigationLinks: state.data.navigationLinks,
    	isMovingRegions: state.transitions.isMovingRegions,
    }
);

export default connect(mapStateToProps)(Navigation);