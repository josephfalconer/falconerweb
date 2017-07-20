import React, { PropTypes } from 'react';

import ModuleSkills from './ModuleSkills';
import ModuleDemos from './ModuleDemos';


const Modules = props => {
	return (
		<div className="module">
			{props.name == 'skills' ?
				<ModuleSkills
					skills={props.data}
				/>
				:
				null
			}
			{props.name == 'demos' ?
				<ModuleDemos
					demos={props.data}
				/>
				:
				null
			}
		</div>
	);	
}

Modules.propTypes = {
	name: PropTypes.string.isRequired,
	data: PropTypes.array.isRequired,
}

export default Modules;