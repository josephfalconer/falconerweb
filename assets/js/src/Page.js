import React, { PropTypes } from 'react';

import Modules from './modules/Modules';


const Page = props => {
	let page = props.currentPageData,
		moduleName = props.currentModuleName,
		moduleData = props.currentModuleData;
	
	return (
		<section className="container">
			<header className="header">
				<div className="header__content">
					<h1>{page.title}</h1>
				</div>
			</header>

			{moduleName.length && moduleData.length ?
				<Modules 
					name={moduleName}
					data={moduleData}
				/>
				:
				null
			}
		</section>
	)
}

Page.propTypes = {
	currentPageData: PropTypes.object.isRequired,
	currentModuleName: PropTypes.string.isRequired,
	currentModuleData: PropTypes.array.isRequired,
}

export default Page;