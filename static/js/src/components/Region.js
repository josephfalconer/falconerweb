import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';


import Icons from './icons/Icons';
import ContentModules from './modules/ContentModules';


const Region = props => {
	const { data, contentModules } = props;
	const Icon = Icons[data.icon.toUpperCase()];
	let regionInnerClass = `region__inner text text--${data.text_colour}`;
	let currentModules = [];
	let isNeededModules = false;

	for (let module of contentModules) {
		if (module.region == data.path_hash) {
			
			if (!isNeededModules) {
				isNeededModules = true;
			}
			currentModules.push(module);
		}
	}

	if (!currentModules.length && data.center_content) {
		regionInnerClass += ' center-content';
	}

	if (!data.center_content) {
		regionInnerClass += ' padding--ends';
	}

	return (
		<article className={props.regionClass}>
			<div className={regionInnerClass} style={{ backgroundImage: `url(${data.background})` }}>
				<div className="region__content">
					<header className="region__header container">
						{Icon && 
							<span className="region__icon">{Icon()}</span>
						}
						<h1 className="region__title">{data.display_title || data.title}</h1>
						{data.intro_text &&
							<p className="region__intro" dangerouslySetInnerHTML={{__html: data.intro_text}}></p>
						}
					</header>

					{isNeededModules &&
						currentModules.map((contentModule, index) => {	
							const Module = ContentModules[contentModule.module_type.toUpperCase()];
							if (Module) {
								return Module(contentModule, index);
							}
						})
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
