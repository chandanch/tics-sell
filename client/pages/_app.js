import 'bootstrap/dist/css/bootstrap.css';
import Header from '../components/Header';
import createClient from '../utils/create-api-client';

const MyApp = ({ Component, pageProps }) => {
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
		return data;
	} catch (error) {
		console.log(error);
		return {};
	}
};

export default MyApp;
