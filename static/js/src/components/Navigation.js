import React, { Fragment, PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { updateStoreState } from '../actions';
import { ICONS } from '../constants';
import Icon from './icons/Icon';

class Navigation extends PureComponent {
  render() {
    const { navigationLinks, pages, menuIsOpen } = this.props;
    return (
      <nav className="nav">
        <ul className="nav__menu nav__menu--top list--plain">
          <li className="nav__item--top">
            <Link
              to="/"
              className="nav__link"
              onClick={this.blockNavOrCloseMenu}
            >
              <Icon iconType={ICONS.LOGO} />
            </Link>
          </li>
          <li className="nav__item--top nav__item--trigger">
            <a
              href=""
              className="nav__hamburger"
              onClick={this.toggleMenu}
            >
              <span></span>
              <span></span>
              <span></span>
            </a>
          </li>
        </ul>
        <div className="nav__slider">
          <ul className="nav__menu nav__menu--main list--plain">
          {pages.length && pages.map((page, index) => (
            <Fragment key={`page-link-${index}`}>
              <li className="nav__item nav__item--toppage">
                <Link
                  to={page.path}
                  className={this.getMainLinkClassName(page.path)}
                  onClick={this.blockNavOrCloseMenu}
                >
                  {page.title}
                </Link>
              </li>
              {page.child_pages.length && page.child_pages.map((childPage, index) => (
                <li key={`sub-link-${index}`} className="nav__item nav__item--subpage">
                  <Link
                    to={childPage.path}
                    className={this.getMainLinkClassName(childPage.path)}
                    onClick={this.blockNavOrCloseMenu}
                  >
                    {childPage.title}
                  </Link>
                </li>
              ))}
            </Fragment>
          ))}
          </ul>
        </div>
        <ul className="nav__menu--circles list--plain">
          {pages.length && pages.map((page, index) => (
            <li key={`circle-link-${index}`} className="nav__item--circle">
              <Link
                to={page.path}
                className={this.getCircleLinkClassName(page.path)}
                onClick={this.blockNavOrCloseMenu}
              ></Link>
            </li>
          ))}
        </ul>
        <div className="nav__overlay" onClick={this.toggleMenu}></div>
      </nav>
    );
  }

  toggleMenu = event => {
    event.preventDefault();
    this.props.updateStoreState({menuIsOpen: !this.props.menuIsOpen});
  }

  getMainLinkClassName = path =>
    `nav__link${path === this.props.currentPath ? ' nav__link--current' : ''}`

  getCircleLinkClassName = path => {
    const { currentPath, currentPage } = this.props;
    const isCurrent = (
      (path.split('/')[1] === currentPath.split('/')[1]) ||
      (path === '/' && currentPage && currentPage.is_homepage_child)
    );
    return `nav__link nav__link--circle${isCurrent ? ' nav__link--current' : ''}`;
  }

  blockNavOrCloseMenu = event => {
    if (this.props.isPageTransition) {
      event.preventDefault()
    } else if (this.props.menuIsOpen) {
      this.props.updateStoreState({menuIsOpen: false});
    }
  }
}

function mapStateToProps({
  navigationLinks,
  isPageTransition,
  currentPage,
  pages,
  menuIsOpen
}, props) {
  return {
    ...props,
    navigationLinks: navigationLinks || [],
    isPageTransition,
    currentPage,
    pages,
    menuIsOpen
  }
}

export default connect(mapStateToProps, {
  updateStoreState
})(Navigation);
