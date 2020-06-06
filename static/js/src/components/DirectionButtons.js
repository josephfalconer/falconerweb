import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';

import { DIRECTION_LIST, DIRECTIONS } from '../constants';
import * as utils from '../utils';
import DirectionButton from './DirectionButton';
import { updateStoreState } from '../actions';

class DirectionButtons extends PureComponent {
  componentDidMount() {
    document.addEventListener('keydown', this.navigateFromKeyPress);
  }

  render() {
    return (
      <nav className="directions">
        {DIRECTION_LIST.map((direction, index) => (
          <DirectionButton key={index} direction={direction} />
        ))}
      </nav>
    )
  }

  navigateFromKeyPress = event => {
    const { isPageTransition, nextPages, history, scrollWrapper } = this.props;
    if (!isPageTransition && nextPages) {
      const direction = this.getDirectionFromKeyPress(event);
      const targetPage = nextPages[direction];
      if (targetPage && !utils.canScrollElement(scrollWrapper, direction)) {
        history.push(targetPage.path);
      }
    }
  }

  getDirectionFromKeyPress = event => {
    switch (event.which) {
      case 37:
        return DIRECTIONS.LEFT;
      case 39:
        return DIRECTIONS.RIGHT;
      case 38:
        return DIRECTIONS.UP;
      case 40:
        return DIRECTIONS.DOWN;
    }
  }
}

function mapStateToProps({
  nextPages,
  isPageTransition,
  scrollWrapper,
}, props) {
  return {
    ...props,
    nextPages,
    isPageTransition,
    scrollWrapper,
  }
}

export default withRouter(connect(mapStateToProps, {
  updateStoreState,
})(DirectionButtons));
