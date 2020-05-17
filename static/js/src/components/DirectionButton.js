import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class DirectionButton extends PureComponent {
  render() {
    const { nextPages, direction, isVisible } = this.props;
    const toPage = nextPages && nextPages[direction];
    return (
      <Link
        to={toPage ? toPage.path : ''}
        className={this.getClassName()}
        onClick={this.blockNavigation}
        tabIndex={!isVisible ? -1 : undefined}
      >
        <span className="direction__inner">
          <span className="direction__text is-displayed-lg">{toPage ? toPage.title : null}</span>
          <span className="direction__icon">
            <i></i>
            <i></i>
          </span>
        </span>
      </Link>
    )
  }

  getClassName = () => {
    const { direction, isVisible } = this.props;
    return `direction direction--${direction.toLowerCase()} js-${isVisible ? 'visible' : 'hidden'}-button`;
  }

  blockNavigation = e => {
    if (!this.props.isVisible) {
      e.preventDefault();
    }
  }
}

function mapStateToProps({
  nextPages,
  isPageTransition
}, props) {
  const isVisible = Boolean(nextPages && nextPages[props.direction]) && !isPageTransition;
  return {
    nextPages,
    isVisible
  }
}

export default connect(mapStateToProps)(DirectionButton);

