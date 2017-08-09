import React, { PropTypes } from 'react';
import { Link, NavLink, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import Icons from './icons/Icons';


const Navigation = props => {
	return (
		<nav className="nav">
			<ul className="nav__menu list--plain">
				{props.navigationLinks.map((link, index) => {
					
					let navItemClass = index == 0 ? 'nav__item nav__item--logo' : 'nav__item',
						hash = `/${link.linked_region}`,
						{ [link.icon]:Icon } = Icons;

					Icon = Icon.call();

					return (
						<li 
							key={index} 
							className={navItemClass}
							onClick={() => { if (!props.isMovingView) props.transitionRegion(index); }}
						>
							<NavLink
								to={hash}
								className="nav__link"
								activeClassName="nav__link nav__link--current"
								exact
								onClick={e => { if (props.isMovingView) e.preventDefault(); }}
							>
								<span className="nav__linkcircle">
									{Icon}
									<span className="nav__linktext">{link.text}</span>
				                </span>
							</NavLink>

						</li>
					);
				})}
			</ul>
		</nav>
	)
}

Navigation.propTypes = {
	navigationLinks: PropTypes.array.isRequired,
	transitionRegion: PropTypes.func.isRequired,
	isMovingView: PropTypes.bool.isRequired,
}

const mapStateToProps = state => (
    {
    	navigationLinks: state.data.navigationLinks
    }
);

export default connect(mapStateToProps)(Navigation);