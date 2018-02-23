import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Link, Route } from 'react-router-dom';

import IncomingRegion from '../components/IncomingRegion';
// import DirectionButtons from '../components/DirectionButtons';
// import Navigation from '../components/Navigation';
import OutgoingRegion from '../components/OutgoingRegion';


class Regions extends Component {
	static propTypes = {
        primaryRegions: PropTypes.array,
        subRegions: PropTypes.array,
        isMovingRegions: PropTypes.bool.isRequired,
        outgoingRegion: PropTypes.object,
        regionTextColour: PropTypes.string.isRequired
	}

	constructor() {
		super();
		this.isSortedRegions = false;
	}

	// TODO - do this on backend with serializer
	getChildRegions = parentRegions => {
		const { subRegions } = this.props;
		let sortedRegions = [];

		if (subRegions.length) {
			parentRegions.forEach(parentRegion => {
				let ownChildRegions = [];
				let y = 0;

				subRegions.forEach(subRegion => {
					if (subRegion.parent_region === parentRegion.path_hash) {
						y++;
						ownChildRegions.push({
							...subRegion,
							x: parentRegion.x,
							y
						});
					}
				});
				sortedRegions.push({
					...parentRegion,
					ownChildRegions
				})
			});
			this.isSortedRegions = true;
		}
		return sortedRegions;
	}

	renderChildRegions = (parentPath, childRegions) => {
		if (childRegions) {
			return childRegions.map(childRegion => (
				<Route 
					key={`region-${childRegion.path_hash}`}
					path={`/${parentPath}/${childRegion.path_hash}/`} 
					render={() => (
						<IncomingRegion 
							pathToParent={parentPath}
							data={childRegion} 
						/>
					)} 
				/>
			))
		}
		return null;
	}

	render() {
		const { primaryRegions, outgoingRegion, isMovingRegions } = this.props;
		let sortedRegions = [];

		if (primaryRegions.length) {
			sortedRegions = this.getChildRegions(primaryRegions);
		}

		if (isMovingRegions) {
			// TODO - replace with ref?
			document.getElementById('regions').scrollTop = 0;
		}

		return (
			<main id="regions" className="regions">	
				{outgoingRegion && isMovingRegions &&
					<OutgoingRegion data={outgoingRegion} />
				}
				{this.isSortedRegions && sortedRegions.map(parentRegion => {
					const { path_hash, ownChildRegions } = parentRegion;
					const childRegionPaths = ownChildRegions.map(childRegion => 
						`/${path_hash}/${childRegion.path_hash}`
					);

					return (
						<div key={`region-${path_hash}`}>
							<Route
								exact
								path={`/${path_hash}/`} 
								render={() => (
									<IncomingRegion 
										pathToParent={path_hash}
										data={parentRegion} 
										ownChildRegions={ownChildRegions}
									/>
								)}
							/>
							{this.renderChildRegions(path_hash, ownChildRegions)}
						</div>
					)
				})}
			</main>
		)
	};
}

const mapStateToProps = state => (
    {
        primaryRegions: state.data.primaryRegions,
        subRegions: state.data.subRegions,
        isMovingRegions: state.transitions.isMovingRegions,
        outgoingRegion: state.transitions.outgoingRegion,
        regionTextColour: state.transitions.currentTextColour,
    }
);

export default withRouter(connect(mapStateToProps)(Regions));
