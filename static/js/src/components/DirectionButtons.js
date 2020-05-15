import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';

import * as helpers from '../helpers';
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
          targetPage: pages[currentPage.x - 1],
          name: 'left'
        },
        {
          isVisible: (currentPage.x + 1) < pages.length && currentPage.y === 0,
          targetPage: pages[currentPage.x + 1],
          name: 'right'
        },
        {
          isVisible: currentPage.y > 0,
          targetPage: currentChildPages[currentPage.y - 2] || pages[currentPage.x],
          name: 'up'
        },
        {
          isVisible: currentPage.y < currentChildPages.length,
          targetPage: currentChildPages[currentPage.y],
          name: 'down'
        }
      ]
    }
    return [];
  }

  navigateFromKeyPress = event => {
    const { isPageTransition, directionButtons, history, scrollWrapper } = this.props;
    if (directionButtons && !isPageTransition) {
      const button = directionButtons[this.getButtonIndexFromKeyPress(event)];
      if (button && button.isVisible && !helpers.canScrollElement(scrollWrapper, button.name)) {
        history.push(button.targetPage.path);
      }
    }
  }

  getButtonIndexFromKeyPress = event => {
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
    const { isPageTransition, directionButtons } = this.props;
    return (
      <nav className="directions">
        {directionButtons && directionButtons.map((button, index) => {
          return (
            <DirectionButton
              key={index}
              button={button}
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
  directionButtons,
  scrollWrapper,
}, props) {
  return {
    ...props,
    pages,
    currentPage,
    isPageTransition,
    directionButtons,
    scrollWrapper,
  }
}

export default withRouter(connect(mapStateToProps, {
  updateStoreState,
})(DirectionButtons));
