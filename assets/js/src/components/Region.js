import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Icons from './icons/Icons';
import ContentModules from './modules/ContentModules';
import * as RegionActionCreators from '../actions/transitions';


class Region extends Component {

	static propTypes = {
		data: PropTypes.object.isRequired,
		outgoingRegion: PropTypes.object,
		currentRegion: PropTypes.object,
		isOutgoingRegion: PropTypes.bool,
		contentModules: PropTypes.array,
	}
	
	componentDidMount() {
		const Region = this,
			{ dispatch, data, isOutgoingRegion, timeoutDelay } = Region.props;
		
		// outgoing region is only presentational
		if (isOutgoingRegion) {
			return;
		}
		
		const setTransitionsData = bindActionCreators(RegionActionCreators.setTransitionsData, dispatch);
		
		// allows direction buttons to render
		setTransitionsData(data, 'SET_CURRENT_REGION');

		// allows outgoing region to render
		setTransitionsData(true, 'SET_MOVING_REGIONS');

		// affects styles for nav and direction buttons
		setTransitionsData(data.text_colour, 'SET_TEXT_COLOUR');

		// next transition shows this Region instance as outgoing
		setTimeout(() => {
			setTransitionsData(false, 'SET_MOVING_REGIONS');
			setTransitionsData(data, 'SET_OUTGOING_REGION');
		}, timeoutDelay);
	}

	getTransitionClass = () => {
		// compare incoming and outgoing - Redux store
		const { isOutgoingRegion, outgoingRegion, currentRegion } = this.props,
			isSideways = outgoingRegion.y == currentRegion.y && Math.abs(outgoingRegion.x - currentRegion.x) == 1,
			isVertical = outgoingRegion.x == currentRegion.x && Math.abs(outgoingRegion.y - currentRegion.y) == 1,
			isLeftwards = currentRegion.x < outgoingRegion.x,
			isUpwards = currentRegion.y < outgoingRegion.y;

		let transitionClass;

		// outgoing
		if (isOutgoingRegion) {
			transitionClass = ' js-outgoing js-outgoing-';

			// exit to left or right
			if (isSideways) {
				transitionClass += isLeftwards ? 'right' : 'left';

			// exit to top or bottom
			} else if (isVertical) {
				transitionClass += isUpwards ? 'bottom' : 'top';

			// fade out
			} else {
				transitionClass += 'fade';
			}

		// incoming
		} else {
			transitionClass = ' js-incoming js-incoming-';

			// enter from left or right
			if (isSideways) {
				transitionClass += isLeftwards ? 'left' : 'right';

			// enter from top or bottom
			} else if (isVertical) {
				transitionClass += isUpwards ? 'top' : 'bottom';

			// fade in
			} else {
				transitionClass += 'fade';
			}
		}

		return transitionClass;
	}

	render() {
		const { data, contentModules, outgoingRegion, isMovingRegions } = this.props,
			backgroundStyle = { backgroundImage: `url(${data.background})` };

		let { [data.icon]:Icon } = Icons,
			regionInnerClass = `region__inner text text--${data.text_colour}`,
			regionClass = 'region';

		// apply an animation 
 		if (outgoingRegion && isMovingRegions) {
 			regionClass += this.getTransitionClass();
 		}

		if (data.center_content) {
			regionInnerClass +=  ' center-content';
		}
		
		if (Icon) {
			Icon = Icon.call();
		}

		return (
			<article className={regionClass}>
				<div className={regionInnerClass} style={backgroundStyle}>
					<div className="region__content">
						<header>
							{Icon && <span className="region__icon">{Icon}</span>}
							<h1>{data.display_title || data.title}</h1>
							<div className="region__intro" dangerouslySetInnerHTML={{__html: data.intro_text}}></div>
						</header>

						{contentModules.map((contentModule, index) => {	
							if (contentModule.region == data.title) {
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
				</div>
			</article>		
		)
	}
}

const mapStateToProps = state => (
    {
    	contentModules: state.data.contentModules,
    	isMovingRegions: state.transitions.isMovingRegions,
    	outgoingRegion: state.transitions.outgoingRegion,
    	currentRegion: state.transitions.currentRegion,
    	timeoutDelay: state.transitions.regionTransitionTimeout,
    }
);

export default connect(mapStateToProps)(Region);
