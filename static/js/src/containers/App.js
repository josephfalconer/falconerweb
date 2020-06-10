import React, { Fragment, PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Route } from 'react-router-dom';

import { updateStoreState } from '../actions';
import DirectionButtons from '../components/DirectionButtons';
import Page from '../components/Page';
import Navigation from '../components/Navigation';
import { THEMES } from '../constants';
import { formatPageData } from '../utils';

class App extends PureComponent {
  componentDidMount() {
    fetch('/api/pages/')
    .then(response => response.json())
    .then(pages => this.props.updateStoreState({pages: formatPageData(pages)}));
    fetch('/api/navigation/')
    .then(response => response.json())
    .then(navigationLinks => this.props.updateStoreState({navigationLinks}));
  }

  render() {
    return (
      <main className={this.getClassName()}>
        <Navigation currentPath={this.props.location.pathname} />
        <DirectionButtons />
        {this.props.pages.length ? this.props.pages.map(page => (
          <Fragment key={page.slug}>
            <Route
              exact
              path={page.path}
              render={() => (
                <Page pageData={page} />
              )}
            />
            {page.child_pages.map(childPage => (
              <Route
                key={`page-${childPage.slug}`}
                path={childPage.path}
                render={() => (
                  <Page pageData={childPage} />
                )}
              />
            ))}
          </Fragment>
        )) : null}
      </main>
    );
  }

  getClassName = () => {
    const { currentPage, isPageTransition, menuIsOpen } = this.props;
    let className = 'app__container';
    if (currentPage && currentPage.theme === THEMES.LIGHT) {
      className += ' js-light-theme';
    } else {
      className += ' js-dark-theme';
    }
    if (isPageTransition) {
      className += ' js-changing-page';
    }
    if (menuIsOpen) {
      className += ' js-menu-open';
    }
    return className;
  }
}

function mapStateToProps({
  isPageTransition,
  currentPage,
  pages,
  menuIsOpen
}, props) {
  return {
    ...props,
    isPageTransition,
    currentPage,
    pages: pages || [],
    menuIsOpen
  }
}

export default withRouter(connect(mapStateToProps, {
  updateStoreState
})(App));
