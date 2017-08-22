import React from 'react';


const LogoIcon = props => {
	return (
		<svg className="nav__svg is-displayed-lg" width="60px" height="60px" viewBox="0 0 60 60">
			<polyline className="fill" points="54.667,27.473 22.589,27.473 22.589,16.793 60,16.8 60,5.147 11.492,5.147 11.492,60 22.589,60 
			22.589,38.965 54.667,38.967 "/>
			<path fill="#FFFFFF" d="M44.646,1.183h10.058v45.379c0.004,4.621-4.185,9.936-10.042,9.945H22.589l-12.324-0.012
			c-2.233,0-9.891-2.98-9.891-9.939c0-0.006,0-5.479,0-5.479l9.92-0.002l0.001,5.482l12.294,0.01l22.058-0.006V1.183z"/>
			<polyline className="fill" points="54.641,27.464 22.563,27.464 22.563,38.956 54.641,38.957 "/>
			<polyline className="fill--onlyhover" fill="rgba(255,255,255,0)" points="54.667,27.473 22.589,27.473 22.589,16.793 60,16.8 60,5.147 11.492,5.147 11.492,60 22.589,60 
			22.589,38.965 54.667,38.967 "/>
		</svg>
	);	
}

export default LogoIcon;