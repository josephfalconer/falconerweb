import React, { PropTypes } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Icons from './icons/Icons';

class Navigation extends React.PureComponent {
  blockNavigation = e => {
    if (this.props.isPageTransition) {
      e.preventDefault()
    }
  }
  render() {
    const { navigationLinks, currentParentPageSlug, currentTextColour } = this.props;
    if (navigationLinks.length) {
      return (
        <nav className="nav">
          <ul className="nav__menu list--plain">
            {navigationLinks.map((link, index) => {
              const Icon = Icons[link.icon.toUpperCase()];
              const isCurrent = link.linked_page.slug === currentParentPageSlug;
              return (
                <li key={index} className="nav__item">
                  <Link
                    to={`/${link.linked_page.slug}`}
                    className={`nav__link ${isCurrent && 'nav__link--current'}`}
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
}

Navigation.propTypes = {
  navigationLinks: PropTypes.array.isRequired,
  isPageTransition: PropTypes.bool.isRequired,
  currentParentPageSlug: PropTypes.string,
  currentTextColour: PropTypes.string,
}

function mapStateToProps({
  navigationLinks,
  isPageTransition,
  currentParentPageSlug,
  currentTextColour
}, props) {
  return {
    ...props,
    navigationLinks,
    isPageTransition,
    currentParentPageSlug,
    currentTextColour
  }
}

export default connect(mapStateToProps)(Navigation);
