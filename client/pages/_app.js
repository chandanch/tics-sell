import 'bootstrap/dist/css/bootstrap.css';
import Header from '../components/Header';
import createClient from '../utils/create-api-client';

const MyApp = ({ Component, pageProps, currentUser }) => {
	return (
		<div>
			<Header />
			<Component {...pageProps} />
		</div>
	);
};

MyApp.getInitialProps = async (appcontext) => {
	const client = await createClient(appcontext.ctx);
	try {
		const { data } = await client.get('/api/users/currentuser');
		let pageProps = {};

		if (appcontext.Component.getInitialProps) {
			pageProps = await appcontext.Component.getInitialProps(appcontext.ctx);
		}

		console.log('Page Props', pageProps);

		return {
			pageProps,
			...data,
		};
	} catch (error) {
		console.log(error);
		return {};
	}
};

export default MyApp;
