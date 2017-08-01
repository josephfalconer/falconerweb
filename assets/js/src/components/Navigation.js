import React, { PropTypes } from 'react';
import { Link, NavLink, Route } from 'react-router-dom';

import Icons from './icons/Icons';


const Navigation = props => {
	return (
		<nav className="nav">

			<Link to="/home">Home</Link>

			<ul className="nav__menu list--plain">
				{props.navigationLinks.map((link, index) => {
					return (
						<li key={index} onClick={e => { props.changePage(e, index) }}>
							<NavLink
								to={link.target}
								activeClassName="selected"
								activeStyle={{
								    fontWeight: 'bold',
								    color: 'tomato'
								   }}
								>{link.text}</NavLink>
						</li> 
					);
	            })}
            </ul>

			<ul className="nav__menu list--plain">
				{props.pages.map((page, index) => {

					let navItemClass = index == 0 ? 'nav__item nav__item--logo' : 'nav__item',
						navLinkClass = index == props.currentPageIndex ? 'nav__link nav__link--current' : 'nav__link';

					let { [page.icon]:Icon } = Icons;
					Icon = Icon.call();

					return (
						<li className={navItemClass} key={index}>
							<a className={navLinkClass} href="#" onClick={e => { props.changePage(e, index) }}>
								<span className="nav__linkcircle">
									{Icon}
									<span className="nav__linktext">{page.title}</span>
				                </span>
							</a>
						</li> 
					);
                })}
			</ul>

			<Route path="/skills" component={Skills}/>
		</nav>
	)
}

const Skills = () => {
	return (
		<div>
			<h1>This is the skills section!</h1>
		</div>
	);
}

Navigation.propTypes = {
	navigationLinks: PropTypes.array.isRequired,
	pages: PropTypes.array.isRequired,
	currentPageIndex: PropTypes.number.isRequired,
	changePage: PropTypes.func.isRequired,
}

export default Navigation;