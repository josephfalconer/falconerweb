import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Icons from './icons/Icons';
import ContentModules from './modules/ContentModules';
import * as RegionActionCreators from '../actions/regions';


class Region extends Component {

	static propTypes = {
		data: PropTypes.object.isRequired,
		contentModules: PropTypes.array,
		isOutgoing: PropTypes.string,
	}
	
	componentDidMount() {
		// shadow region is only presentational
		if (this.props.isOutgoing) {
			return;
		}

		const Region = this,
			{ dispatch, outgoing, data, isOutgoing } = Region.props;

		let { timeoutDelay } = Region.props;
		
		Region.setRegionsData = bindActionCreators(RegionActionCreators.setRegionsData, dispatch);
		
		// direction buttons depend on currentRegion in Redux state
		Region.setRegionsData(data, 'SET_CURRENT_REGION');

		if (outgoing) {
			const transitionClass = Region.setTransitionClass();
		}

		// allow outgoing shadow region to render
		Region.setRegionsData(true, 'SET_MOVING_REGIONS');

		// outgoing shadow region not rendered 
		// next transition will show this Region instance outgoing
		setTimeout(() => {
			Region.setRegionsData(false, 'SET_MOVING_REGIONS');
			Region.setRegionsData(data, 'SET_OUTGOING_REGION');
		}, timeoutDelay);

	}

	setTransitionClass = () => {
		// compare outgoing region data - direct from Redux store -
		// to incoming region data - passed from Application 
		const Region = this,
			{ outgoing, data } = Region.props,
			isSideways = outgoing.y == data.y,
			isVertical = outgoing.x == data.x,
			isRightwards = data.x < outgoing.x,
			isDownwards = data.y < outgoing.y,
			regionsClass = 'regions',
			windowWidth = window.innerWidth,
			windowHeight = window.innerHeight;

		let { timeoutDelay } = Region.props,
			transitionClass;

		if (isSideways && Math.abs(outgoing.x - data.x) == 1 ) {

			transitionClass = isRightwards ? 'js-move-right' : 'js-move-left';

			if (isRightwards) {
				Region.setRegionsData(true, 'SET_OUTGOING_LAST_CHILD');
			}

		} else if (isVertical && Math.abs(outgoing.y - data.y) == 1) {
			
			transitionClass = isDownwards ? 'js-move-down' : 'js-move-up';

			if (isDownwards) {
				Region.setRegionsData(true, 'SET_OUTGOING_LAST_CHILD');
			}

		// diagonal or more than one space
		} else {
			transitionClass = 'js-fade';

			setTimeout(() => {
				Region.setRegionsData(false, 'SET_MOVING_REGIONS');
			}, timeoutDelay / 2);			
		}

		Region.setRegionsData(`${regionsClass} ${transitionClass}`, 'SET_TRANSITION_CLASS');

		setTimeout(() => {
			Region.setRegionsData(false, 'SET_OUTGOING_LAST_CHILD');
			Region.setRegionsData(`${regionsClass}`, 'SET_TRANSITION_CLASS');
		}, timeoutDelay);

		return transitionClass;
	}

	render() {
		const { data, contentModules, offsetStyles } = this.props,
			backgroundStyle = { backgroundImage: `url(${data.background})` },
			longTitle = data.long_title;
		let { [data.icon]:Icon } = Icons;

		if (Icon) {
			Icon = Icon.call();
		}
		return (
			<article className="region text">
				<div className="region__inner" style={backgroundStyle}>
					<header>
						{Icon && <figure className="region__icon">{Icon}</figure>}
						<h1>{longTitle ? longTitle : data.title}</h1>
						<div dangerouslySetInnerHTML={{__html: data.intro_text}}></div>
					</header>

					{contentModules.map((contentModule, index) => {	
						if (contentModule.region == data.pk) {
							return (
								<ContentModules 
									key={index}
									moduleType={contentModule.module_type} 
								/>
							)
						} else {
							return null;
						}
					})}
				</div>
			</article>		
		)
	}
}

const mapStateToProps = state => (
    { 
    	contentModules: state.data.contentModules,
    	outgoing: state.regions.outgoing,
    	timeoutDelay: state.regions.regionTransitionTimeout,
    }
);

export default connect(mapStateToProps)(Region);