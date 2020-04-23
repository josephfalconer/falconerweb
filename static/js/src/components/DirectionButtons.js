import React, { PropTypes, PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';

import DirectionButton from './DirectionButton';
import { updateStoreState } from '../actions';
import { formatVerticalPath } from '../helpers';

class DirectionButtons extends PureComponent {
  static propTypes = {
    parentPages: PropTypes.array.isRequired,
    currentPage: PropTypes.object,
    isMovingPages: PropTypes.bool.isRequired,
    currentParentPageSlug: PropTypes.string,
  }

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
    const { parentPages, currentPage } = nextProps;
    const currentChildPages = nextProps.currentPage.is_child_page ?
      nextProps.parentPages[nextProps.currentPage.x].child_pages:
      nextProps.currentPage.child_pages;
    if (currentPage) {
      return [
        {
          isVisible: currentPage.x > 0 && currentPage.y === 0,
          isVertical: false,
          targetPage: parentPages[currentPage.x - 1],
          name: 'prev'
        },
        {
          isVisible: (currentPage.x + 1) < parentPages.length && currentPage.y === 0,
          isVertical: false,
          targetPage: parentPages[currentPage.x + 1],
          name: 'next'
        },
        {
          isVisible: currentPage.y > 0,
          isVertical: true,
          targetPage: currentChildPages[currentPage.y - 2] || parentPages[currentPage.x],
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
      isMovingPages,
      currentParentPageSlug,
      directionButtons,
      history,
      currentPageScrollWrapper
    } = this.props;
    if (directionButtons) {
      const button = directionButtons[this.getButtonIndexFromPressedKey(event)];
      if ((button && button.isVisible) && !isMovingPages) {
        const targetSlug = button.targetPage.is_homepage ? '' : button.targetPage.slug;
        const newPath = button.isVertical ? formatVerticalPath(currentParentPageSlug, targetSlug) : `/${targetSlug}`;
        if (this.isGoodToPush(button)) {
          history.push(newPath);
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
    const { isMovingPages, currentParentPageSlug, directionButtons, currentTextColour } = this.props;
    return (
      <nav className="directions">
        {directionButtons && directionButtons.map((button, index) => {
          return (
            <DirectionButton
              key={index}
              button={button}
              currentParentPageSlug={currentParentPageSlug}
              isMovingPages={isMovingPages}
            />
          )
        })}
      </nav>
    )
  }
}

function mapStateToProps({
  parentPages,
  currentPage,
  isMovingPages,
  currentParentPageSlug,
  directionButtons,
  currentPageScrollWrapper,
  currentTextColour
}, props) {
  return {
    ...props,
    parentPages,
    currentPage,
    isMovingPages,
    currentParentPageSlug,
    directionButtons,
    currentPageScrollWrapper,
    currentTextColour
  }
}

export default withRouter(connect(mapStateToProps, {
  updateStoreState,
})(DirectionButtons));
