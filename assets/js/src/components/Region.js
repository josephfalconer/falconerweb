import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import Icons from './icons/Icons';
import ContentModule from './modules/ContentModule';


const Region = props => {

	const { data, contentModules } = props,
		backgroundStyle = { backgroundImage: `url(${data.background})` };

	let { [data.icon]:Icon } = Icons,
		regionInnerClass = `region__inner text text--${data.text_colour}`,
		currentModules = [];

	for (let module of contentModules) {
		if (module.region == data.path_hash) {
			currentModules.push(module);
		}
	}

	if (!currentModules.length && data.center_content) {
		regionInnerClass += ' center-content';
	} 

	if (!data.center_content) {
		regionInnerClass += ' padding--ends';
	} 

	if (Icon) {
		Icon = Icon.call();
	}

	return (
		<article id={data.path_hash} className={props.regionClass}>
			<div className={regionInnerClass} style={backgroundStyle}>
				<div className="region__content">
					<header className="region__header container">
						{Icon && 
							<span className="region__icon">{Icon}</span>
						}
						<h1 className="region__title">{data.display_title || data.title}</h1>
						{data.intro_text &&
							<p className="region__intro" dangerouslySetInnerHTML={{__html: data.intro_text}}></p>
						}
					</header>

					{currentModules.length ? 
						currentModules.map((contentModule, index) => {	
							return (
								<ContentModule 
									key={index}
									fields={contentModule} 
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