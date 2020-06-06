import React, { Fragment, PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Route } from 'react-router-dom';

import { updateStoreState } from '../actions';
import DirectionButtons from '../components/DirectionButtons';
import Page from '../components/Page';
import Navigation from '../components/Navigation';
import { TEXT_COLOURS } from '../constants';
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
      <main className={this.getAppContainerClassName()}>
        <header>
          <Navigation currentPath={this.props.location.pathname} />
          <DirectionButtons />
        </header>
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

  getAppContainerClassName = () => {
    const {currentPage, isPageTransition } = this.props;
    let appContainerClassName = 'app__container';
    if (isPageTransition) {
      appContainerClassName += ' js-changing-page';
    }
    if (currentPage && currentPage.text_colour === TEXT_COLOURS.DARK) {
      appContainerClassName += ' js-dark-text';
    }
    return appContainerClassName;
  }
}

function mapStateToProps({
  isPageTransition,
  currentPage,
  pages
}, props) {
  return {
    ...props,
    isPageTransition,
    currentPage,
    pages: pages || []
  }
}

export default withRouter(connect(mapStateToProps, {
  updateStoreState
})(App));
