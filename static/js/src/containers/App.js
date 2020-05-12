import React, { Fragment, PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Route } from 'react-router-dom';

import { addPagesData, formatPagePositions, updateStoreState } from '../actions';
import DirectionButtons from '../components/DirectionButtons';
import Page from '../components/Page';
import Navigation from '../components/Navigation';
import { TEXT_COLOURS } from '../constants';

class App extends PureComponent {
  componentDidMount() {
    fetch('/api/pages/')
    .then(response => response.json())
    .then(pages => this.props.updateStoreState({pages: formatPagePositions(pages)}));
    fetch('/api/navigation/')
    .then(response => response.json())
    .then(navigationLinks => this.props.updateStoreState({navigationLinks}));
  }

  render() {
    const { isPageTransition, currentTextColour, pages } = this.props;
    return (
      <main className={this.getAppContainerClassName()}>
        <header>
          <Navigation />
          <DirectionButtons />
        </header>
        {pages && pages.map(page => (
          <Fragment key={page.slug}>
            <Route
              exact
              path={`/${page.slug}`}
              render={() => (
                <Page
                  basePath={page.slug}
                  pageData={page}
                />
              )}
            />
            {page.child_pages.map(childPage => (
              <Route
                key={`page-${childPage.slug}`}
                path={`${(page.is_homepage ? '' : '/') + page.slug}/${childPage.slug}/`}
                render={() => (
                  <Page
                    basePath={page.slug}
                    pageData={childPage}
                  />
                )}
              />
            ))}
          </Fragment>
        ))}
      </main>
    );
  }

  getAppContainerClassName = () => {
    const { isPageTransition, currentTextColour } = this.props;
    let appContainerClassName = 'app__container';
    if (isPageTransition) {
      appContainerClassName += ' js-changing-page';
    }
    if (currentTextColour === TEXT_COLOURS.DARK) {
      appContainerClassName += ' js-nav-backgrounds';
    }
    return appContainerClassName;
  }
}

function mapStateToProps({
  isPageTransition,
  currentTextColour,
  pages
}, props) {
  return {
    ...props,
    isPageTransition,
    currentTextColour,
    pages
  }
}

export default withRouter(connect(mapStateToProps, {
  addPagesData,
  updateStoreState
})(App));
