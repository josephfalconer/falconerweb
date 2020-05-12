import React from 'react';
import { Link } from 'react-router-dom';

const DirectionButton = props => {
  const {
    button,
    currentBasePath,
    isPageTransition
  } = props;
  const { targetPage } = button;
  const visibiltyClass =
    `js-${button.isVisible && !isPageTransition ?
      'visible' :
      'hidden'}-button`;
  return (
    <Link
      to={button.isVisible && targetPage ? targetPage.path : ''}
      className={`direction direction--${button.name} ${visibiltyClass}`}
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

export default DirectionButton;
