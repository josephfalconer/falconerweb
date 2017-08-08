import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import Icons from './icons/Icons';
import ContentModules from './modules/ContentModules'


const Region = props => {
	const backgroundStyle = { backgroundImage: `url(${props.data.background})` },
		longTitle = props.data.long_title;
	let { [props.data.icon]:Icon } = Icons;

	if (Icon) {
		Icon = Icon.call();
	} 
	
	return (
		<article className="region text">
			<div className="region__inner" style={backgroundStyle}>
				<header>
					{Icon && <figure className="region__icon">{Icon}</figure>}
					<h1>{longTitle ? longTitle : props.data.title}</h1>
					<div dangerouslySetInnerHTML={{__html: props.data.intro_text}}></div>
				</header>

				{props.contentModules.map((contentModule, index) => {	
					if (contentModule.region == props.data.pk) {
						return (
							<ContentModules 
								key={index}
								moduleType={contentModule.module_type} 
							/>
						)
					} else {
						return null;
					}
				})}
			</div>
		</article>		
	)
}

Region.propTypes = {
	data: PropTypes.object.isRequired,
	contentModules: PropTypes.array.isRequired
}

const mapStateToProps = state => (
    { 
    	contentModules: state.data.contentModules
    }
);

export default connect(mapStateToProps)(Region);
