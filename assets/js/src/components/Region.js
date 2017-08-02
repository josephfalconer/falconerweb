import React from 'react';
import { connect } from 'react-redux';


const Region = props => {
	return (
		<section className="region">
			<h1>{props.title}</h1>
		</section>
	)
}


const mapStateToProps = state => (
    {
        regions: state.regions,
    }
);

// export default connect(mapStateToProps)(Region);
export default Region;
