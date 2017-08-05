import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import Icons from './icons/Icons';


const Region = props => {
	const backgroundStyle = { backgroundImage: `url(${props.data.background})` };
	let { [props.data.icon]:Icon } = Icons;

	if (Icon) {
		Icon = Icon.call();
	} 
	
	return (
		<article className="region text" style={backgroundStyle}>
			{Icon && <figure className="region__icon">{Icon}</figure>}
			<h1>{props.data.title}</h1>
			<div dangerouslySetInnerHTML={{__html: props.data.intro_text}}></div>
		</article>		
	)
}

Region.propTypes = {
	data: PropTypes.object.isRequired,
}

export default Region;
