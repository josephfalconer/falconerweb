import React, { PropTypes, PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import PageContent from './PageContent';
import { updateOutgoingPage, updateStoreState } from '../actions';
import { PAGE_TRANSITION_TIMEOUT } from '../constants';
import * as helpers from '../helpers';

class Page extends PureComponent {
	componentDidMount() {
		const { pageData, pathToParent, updateStoreState } = this.props;
		updateStoreState({
			currentParentPageSlug: pathToParent,
			currentPage: pageData,
			currentTextColour: pageData.text_colour,
			isPageTransition: true,
		});
		setTimeout(() => updateStoreState({isPageTransition: false}), PAGE_TRANSITION_TIMEOUT);
	}

	componentWillReceiveProps(nextProps) {
		if (
			nextProps.currentPageScrollWrapper &&
			nextProps.currentPageScrollWrapper !== this.props.currentPageScrollWrapper
		) {
			nextProps.currentPageScrollWrapper.focus();
		}
	}

	componentWillUnmount() {
		this.props.updateOutgoingPage(
			this.props.pageData, 
			this.props.currentPageScrollWrapper.scrollTop
		);
	}

	render() {
		const { pageData, outgoingPage, isPageTransition } = this.props;
		const showTransition = outgoingPage && isPageTransition;
		return (
			<div className={this.getPageClassName(showTransition)}>
	  		{showTransition && (
		      <PageContent pageData={outgoingPage} />
  			)}
	      <PageContent pageData={pageData} isCurrentPage />
			</div>	
		)
	}

	getPageClassName = showTransition => {
		const { currentPage, outgoingPage } = this.props;
		let pageClassName = 'page';
		let transitionClassName = ''

		if (showTransition) {
			transitionClassName = ' js-incoming-';
			
			if (helpers.isSideways(currentPage, outgoingPage)) {
				transitionClassName += helpers.isLeftwards(currentPage, outgoingPage) ? 'left' : 'right';
			} else if (helpers.isVertical(currentPage, outgoingPage)) {
				transitionClassName += helpers.isUpwards(currentPage, outgoingPage) ? 'top' : 'bottom';
			} else {
				transitionClassName += 'fade';
			}
 		}
 		return pageClassName + transitionClassName;
	}
}

Page.propTypes = {
	pageData: PropTypes.object.isRequired,
	pathToParent: PropTypes.string.isRequired,
	outgoingPage: PropTypes.object,
	currentPage: PropTypes.object,
	isPageTransition: PropTypes.bool.isRequired,
	updateStoreState: PropTypes.func.isRequired,
	currentPageScrollWrapper: PropTypes.object,
	updateOutgoingPage: PropTypes.func.isRequired,
}

function mapStateToProps({
	isPageTransition,
	outgoingPage,
	currentPage,
	currentPageScrollWrapper,
}, props) {
	return {
		...props,
		isPageTransition,
		outgoingPage,
		currentPage,
		currentPageScrollWrapper
	}
}

export default connect(mapStateToProps, {
	updateOutgoingPage,
	updateStoreState
})(Page);
