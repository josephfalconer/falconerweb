import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import PageContent from './PageContent';
import { updatePreviousPage, updateStoreState } from '../actions';
import { PAGE_TRANSITION_TIMEOUT } from '../constants';
import * as helpers from '../helpers';

class Page extends PureComponent {
	componentDidMount() {
		const { pageData, updateStoreState } = this.props;
		updateStoreState({
			currentPage: pageData,
			isPageTransition: true,
		});
		setTimeout(() => updateStoreState({isPageTransition: false}), PAGE_TRANSITION_TIMEOUT);
	}

	componentWillUnmount() {
		this.props.updatePreviousPage({
			...this.props.pageData,
			lastScrollTop: this.props.scrollWrapper.scrollTop || 0
		});
	}

	render() {
		const { pageData, previousPage, isPageTransition } = this.props;
		const showTransition = previousPage && isPageTransition;
		return (
			<div className={this.getPageClassName(showTransition)}>
	  		{showTransition && (
		      <PageContent pageData={previousPage} />
  			)}
	      <PageContent pageData={pageData} isCurrentPage />
			</div>	
		)
	}

	getPageClassName = showTransition => {
		const { currentPage, previousPage } = this.props;
		let pageClassName = 'page';
		let transitionClassName = ''

		if (showTransition) {
			transitionClassName = ' js-incoming-';
			
			if (helpers.isSideways(currentPage, previousPage)) {
				transitionClassName += helpers.isLeftwards(currentPage, previousPage) ? 'left' : 'right';
			} else if (helpers.isVertical(currentPage, previousPage)) {
				transitionClassName += helpers.isUpwards(currentPage, previousPage) ? 'top' : 'bottom';
			} else {
				transitionClassName += 'fade';
			}
 		}
 		return pageClassName + transitionClassName;
	}
}

function mapStateToProps({
	isPageTransition,
	previousPage,
	currentPage,
	scrollWrapper,
}, props) {
	return {
		...props,
		isPageTransition,
		previousPage,
		currentPage,
		scrollWrapper
	}
}

export default connect(mapStateToProps, {
	updatePreviousPage,
	updateStoreState
})(Page);
