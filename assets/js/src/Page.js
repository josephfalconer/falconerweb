import React, { PropTypes } from 'react';


const Page = props => {
	let page = props.openPage;
	
	return (
		<section className="page">
			<h1>{page.title}</h1>
		</section>
	)
}

Page.propTypes = {
	openPage: PropTypes.object.isRequired,
}

export default Page;