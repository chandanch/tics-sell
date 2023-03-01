import React from 'react';
import axios from 'axios';

const HomePage = ({ currentUser }) => {
	console.log(currentUser);
	return (
		<div>
			<h1>HomePage</h1>
		</div>
	);
};

HomePage.getInitialProps = async () => {
	if (typeof window === undefined) {
		const requestUrl =
			'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser';
		const { data } = await axios.get(requestUrl, {
			headers: {
				Host: 'ticketing.dev',
			},
		});
		return data;
	} else {
		const { data } = await axios.get('/api/users/currentuser');
		return data;
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
