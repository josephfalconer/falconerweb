import React, { PropTypes } from 'react';

import Icons from './icons/Icons';


const Navigation = props => {
	return (
		<nav className="nav">
			<ul className="nav__menu list--plain">
				{props.pages.map((page, index) => {

					let navItemClass = index == 0 ? 'nav__item nav__item--logo' : 'nav__item';

					let { [page.icon]:Icon } = Icons;
					Icon = Icon.call();

					return (
						<li className={navItemClass} key={index}>
							<a className="nav__link" href="#" onClick={e => { props.onClick(e, index) }}>
								<span className="nav__linkcircle">
									{Icon}
				                </span>
								<span className="nav__linktext">{page.title}</span>
							</a>
						</li> 
					);
                })}
			</ul>
		</nav>
	)
}

Navigation.propTypes = {
	pages: PropTypes.array.isRequired,
	onClick: PropTypes.func.isRequired,
}

export default Navigation;