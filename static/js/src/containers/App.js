import React, { Fragment, PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Route } from 'react-router-dom';

import { addPagesData, updateStoreState } from '../actions';
import DirectionButtons from '../components/DirectionButtons';
import Page from '../components/Page';
import Navigation from '../components/Navigation';
import { TEXT_COLOURS } from '../constants';

class App extends PureComponent {
  componentDidMount() {
    fetch('/api/pages/')
    .then(response => response.json())
    .then(parentPages => this.props.addPagesData(parentPages));
    fetch('/api/navigation/')
    .then(response => response.json())
    .then(navigationLinks => this.props.updateStoreState({navigationLinks}));
  }

  render() {
    const { isPageTransition, currentTextColour, parentPages } = this.props;
    return (
      <main className={this.getAppContainerClassName()}>
        <header>
          <Navigation />
          <DirectionButtons />
        </header>
        {parentPages && parentPages.map(parentPage => (
          <Fragment key={parentPage.slug}>
            <Route
              exact
              path={`/${parentPage.slug}`}
              render={() => (
                <Page
                  pathToParent={parentPage.slug}
                  pageData={parentPage}
                />
              )}
            />
            {parentPage.child_pages.map(childPage => (
              <Route
                key={`page-${childPage.slug}`}
                path={`${(parentPage.is_homepage ? '' : '/') + parentPage.slug}/${childPage.slug}/`}
                render={() => (
                  <Page
                    pathToParent={parentPage.slug}
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
  parentPages
}, props) {
  return {
    ...props,
    isPageTransition,
    currentTextColour,
    parentPages
  }
}

export default withRouter(connect(mapStateToProps, {
  addPagesData,
  updateStoreState
})(App));
