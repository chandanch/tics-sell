import axios from 'axios';

const createClient = async ({ req }) => {
	if (typeof window === 'undefined') {
		console.log('SSR Making Request');
		return axios.create({
			baseURL:
				'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local',
			headers: req.headers,
		});
	} else {
		return axios.create({});
	}
};

export default createClient;
