import React, { Fragment, PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Route } from 'react-router-dom';
import { Swipeable } from 'react-swipeable';

import { updateStoreState } from '../actions';
import Page from '../components/Page';
import Navigation from '../components/Navigation';
import { DIRECTIONS_MAPPED_TO_SWIPE, THEMES } from '../constants';
import * as utils from '../utils';

class App extends PureComponent {
  componentDidMount() {
    fetch('/api/pages/')
    .then(response => response.json())
    .then(pages => this.props.updateStoreState({pages: utils.formatPageData(pages)}));
    document.addEventListener('keydown', this.navigateFromKeyPress);
  }

  render() {
    return (
      <main className={this.getClassName()}>
        <Navigation currentPath={this.props.location.pathname} />
        {this.props.pages.length ? (
          <Swipeable
            onSwiped={this.navigateFromSwipe}
            className="swipe-container"
          >
            {this.props.pages.map(page => (
              <Fragment key={page.slug}>
                <Route
                  exact
                  path={page.path}
                  render={() => (
                    <Page
                      pageData={page}
                      navigateFromDirection={this.navigateFromDirection}
                    />
                  )}
                />
                {page.child_pages.map(childPage => (
                  <Route
                    key={`page-${childPage.slug}`}
                    path={childPage.path}
                    render={() => (
                      <Page
                        pageData={childPage}
                        navigateFromDirection={this.navigateFromDirection}
                      />
                    )}
                  />
                ))}
              </Fragment>
            ))}
          </Swipeable>
        ) : null}
      </main>
    );
  }

  getClassName = () => {
    let className = 'app__container';
    if (this.props.currentPage && this.props.currentPage.theme === THEMES.LIGHT) {
      className += ' js-light-theme';
    } else {
      className += ' js-dark-theme';
    }
    if (this.props.isPageTransition) {
      className += ' js-changing-page';
    }
    if (this.props.menuIsOpen) {
      className += ' js-menu-open';
    }
    if (this.props.isFirstPageRender) {
      className += ' js-rendering-first-page';
    } else if (this.props.hasRenderedFirstPage) {
      className += ' js-rendered-first-page';
    }
    return className;
  }

  navigateFromKeyPress = event =>
    this.navigateFromDirection(utils.getDirectionFromKeyPress(event));

  navigateFromSwipe = event =>
    this.navigateFromDirection(DIRECTIONS_MAPPED_TO_SWIPE[event.dir.toUpperCase()]);

  navigateFromDirection = direction => {
    const { isPageTransition, nextPages, history, scrollWrapper } = this.props;
    if (!isPageTransition && nextPages) {
      const targetPage = nextPages[direction];
      if (targetPage && !utils.canScrollElement(scrollWrapper, direction)) {
        history.push(targetPage.path);
      }
    }
  }
}

function mapStateToProps({
  isPageTransition,
  currentPage,
  pages,
  menuIsOpen,
  isFirstPageRender,
  hasRenderedFirstPage,
  nextPages,
  scrollWrapper
}, props) {
  return {
    ...props,
    isPageTransition,
    currentPage,
    pages: pages || [],
    menuIsOpen,
    isFirstPageRender,
    hasRenderedFirstPage,
    nextPages,
    scrollWrapper
  }
}

export default withRouter(connect(mapStateToProps, {
  updateStoreState
})(App));
