import React, { PropTypes } from 'react';

import Icons from '../icons/Icons';


const Navigation = props => {
	return (
		<nav className="nav">
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
	currentPageIndex: PropTypes.number.isRequired,
	changePage: PropTypes.func.isRequired,
}

export default Navigation;