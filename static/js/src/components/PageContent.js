import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import { updateStoreState } from '../actions';
import Icons from './icons/Icons';
import ContentModules from './modules/ContentModules';

function renderContentModules(pageData) {
  const { content_modules } = pageData;
  if (content_modules && content_modules.length) {
    return content_modules.map((module, index) => {
      const Module = ContentModules[module.module_type];
      return Module ? Module(module, index) : null;
    })
  }
  return null;
}

class PageContent extends PureComponent {
  constructor(props) {
    super(props)
    this.setScrollWrapper = element => this.scrollWrapper = element;
  }

  componentDidMount() {
    if (this.props.pageData.lastScrollTop) {
      this.scrollWrapper.scrollTop = this.props.pageData.lastScrollTop;
    }
    if (this.props.isCurrentPage) {
      this.props.updateStoreState({currentPageScrollWrapper: this.scrollWrapper});
    }
  }

  render () {
    const { pageData, isCurrentPage } = this.props;
    const Icon = Icons[pageData.icon.toUpperCase()];
    return (
      <article 
        tabIndex="0" 
        ref={this.setScrollWrapper} 
        className={`page__content page__content--${isCurrentPage ? 'current' : 'previous'}`}
      >
        <div className={this.getPageInnerClassName()} style={this.getBackgroundImageStyle()}>
          <header className="page__header">
            {Icon &&
              <span className="page__icon">{Icon()}</span>
            }
            <h1 className="page__title">{pageData.display_title || pageData.title}</h1>
            {pageData.intro_text &&
              <p className="page__intro" dangerouslySetInnerHTML={{__html: pageData.intro_text}}></p>
            }
          </header>
          {renderContentModules(pageData)}
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
}

export default connect(undefined, {
  updateStoreState
})(PageContent);
