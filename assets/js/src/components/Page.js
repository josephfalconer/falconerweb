import React, { PropTypes } from 'react';

import Modules from './modules/Modules';


const Page = props => {
	let page = props.currentPageData,
		moduleName = props.currentModuleName,
		moduleData = props.currentModuleData;
	
	return (
		<main className="page">
			<div className="page__background">
				<header className="header">
					<div className="header__content">
						<h1>{page.title}</h1>
					</div>
				</header>

				{moduleName && moduleData ?
					<Modules 
						name={moduleName}
						data={moduleData}
					/>
					:
					null
				}
				<footer>
					<p>Copyright &copy; Joseph Falconer</p>
				</footer>
			</div>
		</main>
	)
}

Page.propTypes = {
	currentPageData: PropTypes.object.isRequired,
	currentModuleName: PropTypes.string,
	currentModuleData: PropTypes.array,
}

export default Page;