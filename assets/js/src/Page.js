import React, { PropTypes } from 'react';


const Page = props => {
	let page = props.currentPage;
	
	return (
		<section className="page">
			<header className="header">
				<div className="header__content">
					<h1>{page.title}</h1>
				</div>
			</header>
		</section>
	)
}

Page.propTypes = {
	currentPage: PropTypes.object.isRequired,
}

export default Page;