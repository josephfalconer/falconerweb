import React, { PropTypes } from 'react';

import SkillsAccordion from './SkillsAccordion';
import DemosMenu from './DemosMenu';


const ContentModule = props => {
	const { fields } = props;

	return (
		<section className="module">
			{fields.module_type == 'skills_accordion' &&
				<SkillsAccordion />
			}
			{fields.module_type == 'demos_menu' &&
				<DemosMenu />
			}
			{fields.module_type == 'text' &&
				<div className="textblock container" dangerouslySetInnerHTML={{__html: fields.text}}></div>
			}
		</section>
	);	
}

ContentModule.propTypes = {
	// moduleFields: PropTypes.string.isRequired,
}

export default ContentModule;