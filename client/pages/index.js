import React from 'react';
import axios from 'axios';
import createClient from '../utils/create-api-client';

const HomePage = ({ currentUser }) => {
	console.log(currentUser);
	return (
		<div>
			{currentUser ? (
				<h1> Hello {currentUser.email} You are Signed In</h1>
			) : (
				<h1>You are not Signed In, Login to Access</h1>
			)}
		</div>
	);
};

HomePage.getInitialProps = async (context) => {
	console.log('HomePage!!');
	const client = await createClient(context);
	try {
		const { data } = await client.get('/api/users/currentuser');
		return data;
	} catch (error) {
		console.log(error);
		return {};
	}
};

// export function getServerSideProps() {
// 	return {
// 		props: {
// 			color: 'blue',
// 		},
// 	};
// }

export default HomePage;
