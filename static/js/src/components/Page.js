import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import PageContent from './PageContent';
import { updatePreviousPage, updateStoreState } from '../actions';
import { DIRECTIONS, PAGE_TRANSITION_TIMEOUT } from '../constants';
import * as utils from '../utils';

class Page extends PureComponent {
	componentDidMount() {
		const { pageData, updateStoreState, hasRenderedFirstPage } = this.props;
		updateStoreState({
			currentPage: pageData,
			nextPages: this.getNextPages(pageData),
			isPageTransition: true,
      isFirstPageRender: !hasRenderedFirstPage ? true : false,
    });
    setTimeout(() =>
      updateStoreState({
        isPageTransition: false,
        previousPage: null,
        hasRenderedFirstPage: true,
      }),
      PAGE_TRANSITION_TIMEOUT
    );
	}

	componentWillUnmount() {
		this.props.updatePreviousPage({
			...this.props.pageData,
			lastScrollTop: this.props.scrollWrapper.scrollTop || 0
		});
	}

	render() {
		const { pageData, previousPage } = this.props;
		return (
			<div className={`page${this.getTransitionClassName()}`}>
	  		{previousPage && (
		      <PageContent pageData={previousPage} />
  			)}
	      <PageContent pageData={pageData} isCurrentPage />
			</div>
		)
	}

	getNextPages = page => {
		const { pages } = this.props;
		const childPages = page.is_child_page ? pages[page.x].child_pages : page.child_pages;
		return {
			[DIRECTIONS.UP]: childPages[page.y - 2] || (pages[page.x].y !== page.y ? pages[page.x] : undefined),
			[DIRECTIONS.DOWN]: childPages[page.y],
			[DIRECTIONS.LEFT]: pages[page.x - 1],
			[DIRECTIONS.RIGHT]: pages[page.x + 1],
		}
	}

  getTransitionClassName = () => {
    return this.props.isPageTransition ? ` js-incoming-${this.getNextPageName() || 'fade'}` : '';
  }

  getNextPageName = () => {
    const { currentPage, previousPage } = this.props;

    if (!currentPage || !previousPage) {
      return null;
    }

    if (utils.isSideways(currentPage, previousPage)) {
      return utils.isLeftwards(currentPage, previousPage) ? 'left' : 'right';
    } else if (utils.isVertical(currentPage, previousPage)) {
      return utils.isUpwards(currentPage, previousPage) ? 'top' : 'bottom';
    }

    return null;
  }
}

function mapStateToProps({
	pages,
	previousPage,
	currentPage,
	scrollWrapper,
  isPageTransition,
  hasRenderedFirstPage
}, props) {
	return {
		...props,
		pages,
		previousPage,
		currentPage,
		scrollWrapper,
    isPageTransition,
    hasRenderedFirstPage
	}
}

export default connect(mapStateToProps, {
	updatePreviousPage,
	updateStoreState
})(Page);
