import React, { PropTypes } from 'react';

import ModuleSkills from './ModuleSkills';
import ModuleDemos from './ModuleDemos';


const Modules = props => {
	return (
		<section className="module">
			<div className="container">
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
		</section>
	);	
}

Modules.propTypes = {
	name: PropTypes.string.isRequired,
	data: PropTypes.array.isRequired,
}

export default Modules;