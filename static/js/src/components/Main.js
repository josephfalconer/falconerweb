import React, { PropTypes, PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Link, Route } from 'react-router-dom';

import { updateStoreState } from '../actions';
import IncomingPage from './IncomingPage';
import OutgoingPage from './OutgoingPage';

const Main = ({
  parentPages,
  outgoingPage,
  isMovingPages,
  location
}) => (
	<main className="pages">
		{outgoingPage && isMovingPages &&
			<OutgoingPage data={outgoingPage} />
		}
		{parentPages && parentPages.map(parentPage => {
			const { slug, child_pages } = parentPage;
			const parentPageSlug = parentPage.is_homepage ? '' : slug;
			return (
				<div key={`page-${slug}`}>
					<Route
						exact
						path={parentPage.is_homepage ? '/' : `/${slug}/`}
						render={() => (
							<IncomingPage
								pathToParent={parentPageSlug}
								data={parentPage}
								location={location}
							/>
						)}
					/>
					{child_pages && child_pages.map(childPage => (
						<Route
							key={`page-${childPage.slug}`}
							path={`${parentPage.is_homepage ? '' : '/' + slug}/${childPage.slug}/`}
							render={() => (
								<IncomingPage
									pathToParent={parentPageSlug}
									data={childPage}
								/>
							)}
						/>
					))}
				</div>
			)
		})}
	</main>
);

Main.propTypes = {
  parentPages: PropTypes.array,
  isMovingPages: PropTypes.bool.isRequired,
  outgoingPage: PropTypes.object,
  location: PropTypes.object.isRequired,
}

function mapStateToProps({
	parentPages, 
	isMovingPages, 
	outgoingPage
}, props) {
	return {
		...props,
		parentPages,
		isMovingPages,
		outgoingPage,
	}
}

export default withRouter(connect(mapStateToProps, {
	updateStoreState
})(Main));
