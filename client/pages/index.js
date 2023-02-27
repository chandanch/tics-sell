import React from 'react';

const HomePage = ({ color }) => {
	return (
		<div>
			<h1 style={{ color }}>HomePage</h1>
		</div>
	);
};

HomePage.getInitialProps = () => {
	console.log('In Server');

	return { color: red };
};

export default HomePage;
