import React, { PropTypes, PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import Page from './Page';
import { updateOutgoingPage, updateStoreState } from '../actions';
import { PAGE_TRANSITION_TIMEOUT } from '../constants';
import * as helpers from '../helpers';

class IncomingPage extends PureComponent {
	componentDidMount() {
		const { data, pathToParent, updateStoreState, currentPageScrollWrapper } = this.props;
		updateStoreState({
			currentParentPageSlug: pathToParent,
			currentPage: data,
			currentTextColour: data.text_colour,
			isMovingPages: true,
		});
		setTimeout(() => updateStoreState({isMovingPages: false}), PAGE_TRANSITION_TIMEOUT);
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
		this.props.updateOutgoingPage(this.props.data, this.props.currentPageScrollWrapper.scrollTop);
	}

	getTransitonClass = () => {
		const { outgoingPage, currentPage } = this.props;
		let transitionClass = 'js-incoming js-incoming-';
		if (helpers.isSideways(currentPage, outgoingPage)) {
			return transitionClass += helpers.isLeftwards(currentPage, outgoingPage) ? 'left' : 'right';
		}
		if (helpers.isVertical(currentPage, outgoingPage)) {
			return transitionClass += helpers.isUpwards(currentPage, outgoingPage) ? 'top' : 'bottom';
		}
		return transitionClass += 'fade';
	}

	render() {
		let pageClass = 'page';
		if (this.props.outgoingPage && this.props.isMovingPages) {
			pageClass = `${pageClass} ${this.getTransitonClass()}`;
 		}
		return (
			<Page
				data={this.props.data}
				pageClass={pageClass}
				updateStoreState={this.props.updateStoreState}
			/>
		)
	}
}

IncomingPage.propTypes = {
	data: PropTypes.object.isRequired,
	pathToParent: PropTypes.string.isRequired,
	outgoingPage: PropTypes.object,
	currentPage: PropTypes.object,
	isMovingPages: PropTypes.bool.isRequired,
	updateStoreState: PropTypes.func.isRequired,
	currentPageScrollWrapper: PropTypes.object,
	updateOutgoingPage: PropTypes.func.isRequired,
}

function mapStateToProps({
	isMovingPages,
	outgoingPage,
	currentPage,
	currentPageScrollWrapper,
}, props) {
	return {
		...props,
		isMovingPages,
		outgoingPage,
		currentPage,
		currentPageScrollWrapper
	}
}

export default connect(mapStateToProps, {
	updateOutgoingPage,
	updateStoreState
})(IncomingPage);
