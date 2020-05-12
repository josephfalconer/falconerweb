import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Icons from './icons/Icons';

class Navigation extends PureComponent {
  blockNavigation = e => {
    if (this.props.isPageTransition) {
      e.preventDefault()
    }
  }
  render() {
    if (this.props.navigationLinks.length) {
      return (
        <nav className="nav">
          <ul className="nav__menu list--plain">
            {this.props.navigationLinks.map((link, index) => {
              const Icon = Icons[link.icon.toUpperCase()];
              return (
                <li key={index} className="nav__item">
                  <Link
                    to={`/${link.linked_page.slug}`}
                    className={this.getLinkClassName(link)}
                    onClick={this.blockNavigation}
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

  getLinkClassName = link => {
    const { currentPath, currentPage } = this.props;
    let linkClassName = 'nav__link';
    if (
      (currentPath.split('/')[1] === link.linked_page.slug) ||
      (link.linked_page.is_homepage && currentPage && currentPage.is_homepage_child)
    ) {
      linkClassName += ' nav__link--current';
    }
    return linkClassName;
  }
}

function mapStateToProps({
  navigationLinks,
  isPageTransition,
  currentPage
}, props) {
  return {
    ...props,
    navigationLinks,
    isPageTransition,
    currentPage
  }
}

export default connect(mapStateToProps)(Navigation);
