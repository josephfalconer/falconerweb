import React, { PropTypes } from 'react';

import SkillsAccordion from './SkillsAccordion';
import DemosMenu from './DemosMenu';


const ContentModules = {
	SKILLS_ACCORDION: (fields, key) => {
		return <SkillsAccordion key={key} />;
	},
	DEMOS_MENU: (fields, key) => {
		return <DemosMenu key={key} />;
	},
	TEXT: (fields, key) => {
		return <div key={key} className="textblock container" dangerouslySetInnerHTML={{__html: fields.text}}></div>;
	}
}

export default ContentModules;