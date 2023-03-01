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
