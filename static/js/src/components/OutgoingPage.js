import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { isSideways, isVertical, isLeftwards, isUpwards } from '../helpers';
import Page from './Page';

const OutgoingPage = props => {
	// compare incoming and outgoing - Redux store
	const { data, outgoingPage, currentPage, lastScrollTop } = props;
	let pageClass = 'page js-outgoing js-outgoing-';
	// exit to left or right
	if (isSideways(currentPage, outgoingPage)) {
		pageClass += isLeftwards(currentPage, outgoingPage) ? 'right' : 'left';
	// exit to top or bottom
	} else if (isVertical(currentPage, outgoingPage)) {
		pageClass += isUpwards(currentPage, outgoingPage) ? 'bottom' : 'top';
	// fade out
	} else {
		pageClass += 'fade';
	}
	return (
		<Page
			data={data}
			pageClass={pageClass}
			lastScrollTop={lastScrollTop}
			isOutgoingPage
		/>
	)
}

function mapStateToProps({
	outgoingPage,
	currentPage,
	lastScrollTop
}, props) {
	return {
		...props,
		outgoingPage,
		currentPage,
		lastScrollTop
	}
}

export default connect(mapStateToProps)(OutgoingPage);
