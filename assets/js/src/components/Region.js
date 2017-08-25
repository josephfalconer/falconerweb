import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Icons from './icons/Icons';
import ContentModules from './modules/ContentModules';
import * as RegionActionCreators from '../actions/transitions';


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
		
		Region.setTransitionsData = bindActionCreators(RegionActionCreators.setTransitionsData, dispatch);
		
		// direction buttons depend on currentRegion in Redux state
		Region.setTransitionsData(data, 'SET_CURRENT_REGION');

		// nav/direction buttons need this
		Region.setTransitionsData(data.text_colour, 'SET_TEXT_COLOUR');

		if (outgoing) {
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
			{ outgoing, data } = Region.props,
			isSideways = outgoing.y == data.y && Math.abs(outgoing.x - data.x) == 1,
			isVertical = outgoing.x == data.x && Math.abs(outgoing.y - data.y) == 1,
			isRightwards = data.x < outgoing.x,
			isDownwards = data.y < outgoing.y,
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
			longTitle = data.long_title;

		let { [data.icon]:Icon } = Icons;

		if (Icon) {
			Icon = Icon.call();
		}

		return (
			<article className={regionClass}>
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
    	outgoing: state.transitions.outgoing,
    	timeoutDelay: state.transitions.regionTransitionTimeout,
    }
);

export default connect(mapStateToProps)(Region);
