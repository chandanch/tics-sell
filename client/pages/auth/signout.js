import useRequest from '../../hooks/use-request';
import Router from 'next/router';
import { useEffect } from 'react';

const SignOut = () => {
	const { makeRequest, errors } = useRequest({
		url: '/api/users/signout',
		method: 'post',
		body: {},
		onSuccess: () => Router.push('/'),
	});

	useEffect(() => {
		makeRequest();
	}, []);

	return <div>You are being Signed Out & Redirected...</div>;
};

export default SignOut;
