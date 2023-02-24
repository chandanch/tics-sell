import { useState } from 'react';
import axios from 'axios';

const useRequest = (url, method, body) => {
	const [errors, setErrors] = useState(null);

	const doRequest = async () => {
		try {
			const response = await axios.post('/api/users/signup', {
				email,
				password,
			});
			console.log(response.data);
		} catch (error) {
			const errors = error.response.data.errors;
			setErrors(
				<div className="alert alert-danger" style={{ marginTop: '10px' }}>
					<h4>Whoops Signup Failed</h4>
					<p>See below for errors:</p>
					{validationErrors.map((error) => (
						<li key={error.message}>{error.message}</li>
					))}
				</div>
			);
		}
	};

	return { doRequest, errors };
};

export default useRequest;
