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
		contentModules: PropTypes.array,
		isOutgoing: PropTypes.string,
	}
	
	componentDidMount() {
		const Region = this,
			{ dispatch, outgoingRegion, data, isOutgoing } = Region.props;

		let { timeoutDelay } = Region.props;

		// incoming region determines transition
		if (isOutgoing) {
			return;
		}
		
		Region.setTransitionsData = bindActionCreators(RegionActionCreators.setTransitionsData, dispatch);
		
		// direction buttons depend on currentRegion in Redux state
		Region.setTransitionsData(data, 'SET_CURRENT_REGION');

		// nav/direction buttons need this
		Region.setTransitionsData(data.text_colour, 'SET_TEXT_COLOUR');

		if (outgoingRegion) {
			const transitionClass = Region.setTransitionClass();
		}

		// allow outgoing shadow region to render
		Region.setTransitionsData(true, 'SET_MOVING_REGIONS');

		// outgoing shadow region not rendered 
		// next transition will show this Region instance outgoing
		setTimeout(() => {
			Region.setTransitionsData(false, 'SET_MOVING_REGIONS');
			Region.setTransitionsData(data, 'SET_OUTGOING_REGION');
		}, timeoutDelay);
	}

	setTransitionClass = () => {
		// compare outgoing region data - direct from Redux store -
		// to incoming region data - passed from Application 
		const Region = this,
			{ outgoingRegion, data } = Region.props,
			isSideways = outgoingRegion.y == data.y && Math.abs(outgoingRegion.x - data.x) == 1,
			isVertical = outgoingRegion.x == data.x && Math.abs(outgoingRegion.y - data.y) == 1,
			isRightwards = data.x < outgoingRegion.x,
			isDownwards = data.y < outgoingRegion.y,
			regionsClass = 'regions';

		let { timeoutDelay } = Region.props,
			transitionClass;

		if (isSideways) {

			transitionClass = isRightwards ? 'js-move-right' : 'js-move-left';

			if (isRightwards) {
				Region.setTransitionsData(true, 'SET_OUTGOING_LAST_CHILD');
			}

		} else if (isVertical) {
			
			transitionClass = isDownwards ? 'js-move-down' : 'js-move-up';

			if (isDownwards) {
				Region.setTransitionsData(true, 'SET_OUTGOING_LAST_CHILD');
			}

		// diagonal or more than one space
		} else {
			transitionClass = 'js-fade';

			setTimeout(() => {
				Region.setTransitionsData(false, 'SET_MOVING_REGIONS');
			}, timeoutDelay / 2);			
		}

		Region.setTransitionsData(`${regionsClass} ${transitionClass}`, 'SET_TRANSITION_CLASS');

		setTimeout(() => {
			Region.setTransitionsData(false, 'SET_OUTGOING_LAST_CHILD');
			Region.setTransitionsData(`${regionsClass}`, 'SET_TRANSITION_CLASS');
		}, timeoutDelay);

		return transitionClass;
	}

	render() {
		const { data, contentModules, offsetStyles } = this.props,
			regionClass = `region region--${data.text_colour}text text`,
			backgroundStyle = { backgroundImage: `url(${data.background})` },
			displayTitle = data.display_title;

		let { [data.icon]:Icon } = Icons;

		if (Icon) {
			Icon = Icon.call();
		}

		return (
			<article className={regionClass}>
				<div className="region__inner" style={backgroundStyle}>
					<header>
						{Icon && <span className="region__icon">{Icon}</span>}
						<h1>{displayTitle ? displayTitle : data.title}</h1>
						<div className="region__intro" dangerouslySetInnerHTML={{__html: data.intro_text}}></div>
					</header>

					{contentModules.map((contentModule, index) => {	
						if (contentModule.region == data.pk) {
							console.log(contentModule, data.pk);
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
    	outgoingRegion: state.transitions.outgoingRegion,
    	timeoutDelay: state.transitions.regionTransitionTimeout,
    }
);

export default connect(mapStateToProps)(Region);
