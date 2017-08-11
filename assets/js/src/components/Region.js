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
		isOutgoingRegion: PropTypes.string
	}
	
	componentDidMount() {
		// shadow region is only presentational
		if (this.props.isOutgoingRegion) {
			return;
		}

		const Region = this,
			{ dispatch, outgoingRegion, data, isOutgoingRegion } = Region.props;

		let { timeoutDelay } = Region.props;
		
		Region.setRegionsData = bindActionCreators(RegionActionCreators.setRegionsData, dispatch);
		
		// direction buttons depend on currentRegion in Redux state
		Region.setRegionsData(data, 'SET_CURRENT_REGION');

		if (outgoingRegion) {
			const transitionClass = Region.setTransitionClass();

			if (transitionClass == 'js-fade') {
				timeoutDelay = timeoutDelay / 2;
			}
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
			{ outgoingRegion, data } = Region.props,
			outgoingX = outgoingRegion.x,
			outgoingY = outgoingRegion.y,
			incomingX = data.x,
			incomingY = data.y,
			regionsClass = 'regions',
			windowWidth = window.innerWidth,
			windowHeight = window.innerHeight;

		let { timeoutDelay } = Region.props,
			transitionClass,
			regionsStyle = { top: 0, left: 0 };

		// sideways
		if (outgoingY == incomingY && Math.abs(outgoingX - incomingX) == 1 ) {
			transitionClass = incomingX < outgoingX ? 'js-move-sideways js-move-right' : 'js-move-sideways';
			regionsStyle.left = incomingX < outgoingX ? `${windowWidth}px` : `-${windowWidth}px`;

			// move regions rightwards
			if (incomingX < outgoingX) {
				Region.setRegionsData(true, 'SET_OUTGOING_REGION_POSITION');
			} 
			
		// vertical
		} else if (outgoingX == incomingX && Math.abs(outgoingY - incomingY) == 1) {
			transitionClass = incomingY > outgoingY ? 'js-move-vertical' : 'js-move-vertical js-move-up';
			regionsStyle.top = incomingY > outgoingY ? `-${windowHeight}px` : `${windowHeight}px`;

			// move upwards
			if (incomingY < outgoingY) {
				Region.setRegionsData(true, 'SET_OUTGOING_REGION_POSITION');
			}

		// diagonal or more than one space
		} else {
			transitionClass = 'js-fade';
			timeoutDelay = timeoutDelay / 2;
		}

		// set the transition
		Region.setRegionsData(`${regionsClass} ${transitionClass}`, 'SET_TRANSITION_CLASS');

		// set top/left offsets
		Region.setRegionsData(regionsStyle, 'SET_REGIONS_OFFSETS');

		// reset regions container class, offset styles and outgoing position
		setTimeout(() => {
			Region.setRegionsData(`${regionsClass}`, 'SET_TRANSITION_CLASS');
			Region.setRegionsData({ top:0, left:0 }, 'SET_REGIONS_OFFSETS');
			Region.setRegionsData(false, 'SET_OUTGOING_REGION_POSITION');
		}, timeoutDelay);

		return transitionClass;
	}

	render() {
		const { data, contentModules } = this.props,
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
    	outgoingRegion: state.regions.outgoingRegion,
    	timeoutDelay: state.regions.regionTransitionTimeout
    }
);

export default connect(mapStateToProps)(Region);
