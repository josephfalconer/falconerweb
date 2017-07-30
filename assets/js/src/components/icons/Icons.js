// Manifest for icon components
import React from 'react';

import IconLogo from './IconLogo';
import IconProjects from './IconProjects';
import IconSkills from './IconSkills';
import IconDemos from './IconDemos';


const Icons = {
	logo: () => {
		return <IconLogo/>;
	},
	skills: () => {
		return <IconSkills/>;
	},
	projects: () => {
		return <IconProjects/>;
	},
	demos: () => {
		return <IconDemos/>;
	}
}

export default Icons;