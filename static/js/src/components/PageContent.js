import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import { updateStoreState } from '../actions';
import { DIRECTIONS } from '../constants';
import * as utils from '../utils';
import Icon from './icons/Icon';
import ContentModule from './modules/ContentModule';

export class PageContent extends PureComponent {
  constructor(props) {
    super(props)
    this.setScrollWrapper = element => this.scrollWrapper = element;
    this.navigateFromWheel = utils.debounce(this.navigateFromWheel, 500, true);
  }

  componentDidMount() {
    if (this.props.pageData.lastScrollTop) {
      this.scrollWrapper.scrollTop = this.props.pageData.lastScrollTop;
    }
    if (this.props.isCurrentPage) {
      this.props.updateStoreState({scrollWrapper: this.scrollWrapper});
      if (!utils.isMobileTablet()) {
        this.scrollWrapper.focus();
      }
    }
  }

  render () {
    const { pageData, isCurrentPage } = this.props;
    return (
      <article
        tabIndex="0"
        ref={this.setScrollWrapper}
        className={`page__content page__content--${isCurrentPage ? 'current' : 'previous'}`}
        onWheel={isCurrentPage ? this.navigateFromWheel : undefined}
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
    let pageInnerClass = `page__inner page__inner--${pageData.theme.toLowerCase()} text`;
    if (!pageData.center_content) {
      pageInnerClass += ' padding--ends';
    } else if (!pageData.content_modules.length) {
      pageInnerClass += ' center-content';
    }
    return pageInnerClass;
  }

  getBackgroundImageStyle = () =>
    this.props.pageData.background && ({
      backgroundImage: `url(${this.props.pageData.background})`
    });

  navigateFromWheel = event =>
    this.props.navigateFromDirection(
      event.nativeEvent.wheelDelta > 0 ?
      DIRECTIONS.UP :
      DIRECTIONS.DOWN
    );
}

export default connect(undefined, {
  updateStoreState
})(PageContent);
