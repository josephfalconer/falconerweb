import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Icon from './icons/Icon';

class Navigation extends PureComponent {
  render() {
    if (this.props.navigationLinks.length) {
      return (
        <nav className="nav">
          <ul className="nav__menu list--plain">
            {this.props.navigationLinks.map((link, index) => {
              return (
                <li key={index} className="nav__item">
                  <Link
                    to={`/${link.linked_page.slug}`}
                    className={this.getLinkClassName(link)}
                    onClick={this.blockNavigation}
                  >
                    {link.icon &&
                      <span className="nav__linkcircle">
                        <span className="nav__icon is-displayed-lg">
                          <Icon iconType={link.icon} />
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

  blockNavigation = e => {
    if (this.props.isPageTransition) {
      e.preventDefault()
    }
  }
}

function mapStateToProps({
  navigationLinks,
  isPageTransition,
  currentPage
}, props) {
  return {
    ...props,
    navigationLinks: navigationLinks || [],
    isPageTransition,
    currentPage
  }
}

export default connect(mapStateToProps)(Navigation);
