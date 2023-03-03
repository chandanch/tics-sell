import React from 'react';
import axios from 'axios';
import createClient from '../utils/create-api-client';

const HomePage = ({ currentUser }) => {
	console.log(currentUser);
	return (
		<div>
			<h1>HomePage</h1>
		</div>
	);
};

HomePage.getInitialProps = async (context) => {
	const client = await createClient(context);
	const { data } = await client.get('/api/users/currentuser');
	return data;
};

// export function getServerSideProps() {
// 	return {
// 		props: {
// 			color: 'blue',
// 		},
// 	};
// }

export default HomePage;
