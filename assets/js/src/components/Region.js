import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import Icons from './icons/Icons';
import ContentModules from './modules/ContentModules';


const Region = props => {

	const { data, contentModules } = props,
		backgroundStyle = { backgroundImage: `url(${data.background})` };

	let { [data.icon]:Icon } = Icons,
		regionInnerClass = `region__inner text text--${data.text_colour}`,
		currentModules = [];

	for (let module of contentModules) {
		if (module.region == data.title) {
			currentModules.push(module);
		}
	}

	if (!currentModules.length) {
		regionInnerClass += data.center_content ? ' center-content' : ' padding--full';
	} else {
		regionInnerClass += ' padding--top';
	}

	if (Icon) {
		Icon = Icon.call();
	}

	return (
		<article className={props.regionClass}>
			<div className={regionInnerClass} style={backgroundStyle}>
				<div className="region__content">
					<header>
						{Icon && <span className="region__icon">{Icon}</span>}
						<h1>{data.display_title || data.title}</h1>
						<div className="region__intro" dangerouslySetInnerHTML={{__html: data.intro_text}}></div>
					</header>

					{currentModules.length ? 
						currentModules.map((contentModule, index) => {	
							return (
								<ContentModules 
									key={index}
									moduleType={contentModule.module_type} 
								/>
							)
						})
						:
						null
					}
				</div>
			</div>
		</article>		
	)
}

Region.propTypes = {
	data: PropTypes.object.isRequired,
	contentModules: PropTypes.array,
	regionClass: PropTypes.string.isRequired,
}

const mapStateToProps = state => (
    {
    	contentModules: state.data.contentModules
    }
);

export default connect(mapStateToProps)(Region);