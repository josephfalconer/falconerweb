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
	<main className="regions">
		{outgoingPage && isMovingPages &&
			<OutgoingPage data={outgoingPage} />
		}
		{parentPages && parentPages.map(parentPage => {
			const { path_hash, child_pages } = parentPage;
			return (
				<div key={`page-${path_hash}`}>
					<Route
						exact
						path={`/${path_hash}/`}
						render={() => (
							<IncomingPage
								pathToParent={path_hash}
								data={parentPage}
								location={location}
							/>
						)}
					/>
					{child_pages && child_pages.map(childPage => (
						<Route
							key={`page-${childPage.path_hash}`}
							path={`/${path_hash}/${childPage.path_hash}/`}
							render={() => (
								<IncomingPage
									pathToParent={path_hash}
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
