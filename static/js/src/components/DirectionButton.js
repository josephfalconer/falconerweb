import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';

class DirectionButton extends PureComponent {
  render() {
    const { button, isPageTransition } = this.props;
    const { targetPage } = button;
    return (
      <Link
        to={targetPage ? targetPage.path : ''}
        className={this.getClassName()}
        onClick={this.blockNavigation}
        tabIndex={!button.isVisible ? -1 : undefined}
      >
        <span className="direction__inner">
          <span className="direction__text is-displayed-lg">{button.isVisible ? targetPage.title : null}</span>
          <span className="direction__icon">
            <i></i>
            <i></i>
          </span>
        </span>
      </Link>
    )
  }

  getClassName = () => {
    const { button, isPageTransition } = this.props;
    const isVisible = button.isVisible && !isPageTransition;
    return `direction direction--${button.name} js-${isVisible ? 'visible' : 'hidden'}-button`;
  }

  blockNavigation = e => {
    if (!this.props.button.isVisible) {
      e.preventDefault();
    }
  }
}

export default DirectionButton;
