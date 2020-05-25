import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { updateStoreState } from '../actions';
import { DIRECTIONS } from '../constants';
import * as helpers from '../helpers';
import Icon from './icons/Icon';
import ContentModule from './modules/ContentModule';

class PageContent extends PureComponent {
  constructor(props) {
    super(props)
    this.setScrollWrapper = element => this.scrollWrapper = element;
    this.navigateFromWheel = helpers.debounce(this.navigateFromWheel, 500, true);
  }

  componentDidMount() {
    if (this.props.pageData.lastScrollTop) {
      this.scrollWrapper.scrollTop = this.props.pageData.lastScrollTop;
    }
    if (this.props.isCurrentPage) {
      this.props.updateStoreState({scrollWrapper: this.scrollWrapper});
      this.scrollWrapper.focus();
    }
  }

  render () {
    const { pageData, isCurrentPage } = this.props;
    return (
      <article
        tabIndex="0"
        ref={this.setScrollWrapper}
        className={`page__content page__content--${isCurrentPage ? 'current' : 'previous'}`}
        onWheel={this.navigateFromWheel}
      >
        <div className={this.getPageInnerClassName()} style={this.getBackgroundImageStyle()}>
          <header className="page__header">
            {pageData.icon &&
              <span className="page__icon">
                <Icon iconType={pageData.icon} />
              </span>
            }
            <h1 className="page__title">{pageData.display_title || pageData.title}</h1>
            {pageData.intro_text &&
              <p className="page__intro" dangerouslySetInnerHTML={{__html: pageData.intro_text}}></p>
            }
          </header>
          {pageData.content_modules.map((module, index) => (
            <ContentModule key={`${module.module_type}-${index}`} module={module} />
          ))}
        </div>
      </article>
    );
  }

  getPageInnerClassName = () => {
    const { pageData } = this.props;
    let pageInnerClass = `page__inner text text--${pageData.text_colour}`;
    if (!pageData.center_content) {
      pageInnerClass += ' padding--ends';
    } else if (!pageData.content_modules.length) {
      pageInnerClass += ' center-content';
    }
    return pageInnerClass;
  }

  getBackgroundImageStyle = () => {
    const { pageData } = this.props;
    let backgroundImageStyle = undefined;
    if (pageData.background) {
      backgroundImageStyle = {
        backgroundImage: `url(${pageData.background})`
      };
    }
    return backgroundImageStyle;
  }

  navigateFromWheel = event => {
    const { nextPages, history, scrollWrapper, isPageTransition } = this.props;

    if (isPageTransition) {
      return;
    }

    const upPage = nextPages[DIRECTIONS.UP];
    const downPage = nextPages[DIRECTIONS.DOWN];
    const wheelUp = event.nativeEvent.wheelDelta > 0;

    if (wheelUp && !helpers.canScrollElement(scrollWrapper, DIRECTIONS.UP) && upPage) {
      history.push(upPage.path);
    } else if (!helpers.canScrollElement(scrollWrapper, DIRECTIONS.DOWN) && downPage) {
      history.push(downPage.path);
    }
  }
}

const mapStateToProps = ({
  scrollWrapper,
  isPageTransition,
  nextPages
}) => ({
  scrollWrapper,
  isPageTransition,
  nextPages
});

export default withRouter(connect(mapStateToProps, {
  updateStoreState
})(PageContent));
