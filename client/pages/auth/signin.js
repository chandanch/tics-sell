import { useState } from 'react';
import Router from 'next/router';

import useRequest from '../../hooks/use-request';

const SignUp = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const { makeRequest, errors } = useRequest({
		url: '/api/users/signin',
		method: 'post',
		body: {
			email,
			password,
		},
		onSuccess: () => Router.push('/'),
	});

	const onSubmit = async (event) => {
		event.preventDefault();
		makeRequest();
	};

	return (
		<form onSubmit={onSubmit}>
			<h1>Sign In</h1>
			<div className="form-group">
				<label>Email Address</label>
				<input
					type="text"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					className="form-control"
				/>
			</div>
			<div className="form-group">
				<label>Password</label>
				<input
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					className="form-control"
				/>
			</div>
			<button className="btn btn-primary">Sign In</button>
			{errors}
		</form>
	);
};

export default SignUp;
