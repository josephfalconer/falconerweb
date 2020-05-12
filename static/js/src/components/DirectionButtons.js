import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';

import DirectionButton from './DirectionButton';
import { updateStoreState } from '../actions';

class DirectionButtons extends PureComponent {
  componentWillReceiveProps(nextProps) {
    if (this.props.currentPage !== nextProps.currentPage) {
      this.props.updateStoreState({
        directionButtons: this.getButtons(nextProps)
      });
    }
    if (this.props.directionButtons !== nextProps.directionButtons) {
      document.removeEventListener('keydown', this.navigateFromKeyPress);
      document.addEventListener('keydown', this.navigateFromKeyPress);
    }
  }

  getButtons = nextProps => {
    const { pages, currentPage } = nextProps;
    const currentChildPages = nextProps.currentPage.is_child_page ?
      nextProps.pages[nextProps.currentPage.x].child_pages:
      nextProps.currentPage.child_pages;
    if (currentPage) {
      return [
        {
          isVisible: currentPage.x > 0 && currentPage.y === 0,
          isVertical: false,
          targetPage: pages[currentPage.x - 1],
          name: 'prev'
        },
        {
          isVisible: (currentPage.x + 1) < pages.length && currentPage.y === 0,
          isVertical: false,
          targetPage: pages[currentPage.x + 1],
          name: 'next'
        },
        {
          isVisible: currentPage.y > 0,
          isVertical: true,
          targetPage: currentChildPages[currentPage.y - 2] || pages[currentPage.x],
          name: 'up'
        },
        {
          isVisible: currentPage.y < currentChildPages.length,
          isVertical: true,
          targetPage: currentChildPages[currentPage.y],
          name: 'down'
        }
      ]
    }
    return [];
  }

  navigateFromKeyPress = event => {
    const {
      isPageTransition,
      directionButtons,
      history,
      currentPageScrollWrapper
    } = this.props;
    if (directionButtons) {
      const button = directionButtons[this.getButtonIndexFromPressedKey(event)];
      if ((button && button.isVisible) && !isPageTransition) {
        if (this.isGoodToPush(button)) {
          history.push(button.targetPage.path);
        } else {
          currentPageScrollWrapper.focus();
        }
      }
    }
  }

  isGoodToPush = button => {
    const { currentPageScrollWrapper } = this.props;
    if (button.isVertical) {
      if (button.name === 'up' && currentPageScrollWrapper.scrollTop > 0) {
        return false;
      }
      if (button.name === 'down') {
        const maxScrollDownPosition = currentPageScrollWrapper.scrollHeight - currentPageScrollWrapper.offsetHeight;
        if (maxScrollDownPosition - currentPageScrollWrapper.scrollTop > 0) {
          return false;
        }
      }
    }
    return true;
  }

  getButtonIndexFromPressedKey = event => {
    switch (event.which) {
      case 37:
        return 0;
      case 39:
        return 1;
      case 38:
        return 2;
      case 40:
        return 3;
    }
  }

  render() {
    const { isPageTransition, currentBasePath, directionButtons, currentTextColour } = this.props;
    return (
      <nav className="directions">
        {directionButtons && directionButtons.map((button, index) => {
          return (
            <DirectionButton
              key={index}
              button={button}
              currentBasePath={currentBasePath}
              isPageTransition={isPageTransition}
            />
          )
        })}
      </nav>
    )
  }
}

function mapStateToProps({
  pages,
  currentPage,
  isPageTransition,
  currentBasePath,
  directionButtons,
  currentPageScrollWrapper,
  currentTextColour
}, props) {
  return {
    ...props,
    pages,
    currentPage,
    isPageTransition,
    currentBasePath,
    directionButtons,
    currentPageScrollWrapper,
    currentTextColour
  }
}

export default withRouter(connect(mapStateToProps, {
  updateStoreState,
})(DirectionButtons));
