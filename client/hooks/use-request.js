import { useState } from 'react';
import axios from 'axios';

const useRequest = ({ url, method, body }) => {
	const [errors, setErrors] = useState(null);

	const makeRequest = async () => {
		try {
			setErrors(null);
			const response = await axios[method](url, body);
			console.log(response.data);
		} catch (error) {
			const requestErrors = error.response.data.errors;
			setErrors(
				<div className="alert alert-danger" style={{ marginTop: '10px' }}>
					<h4>Whoops Signup Failed</h4>
					<p>See below for errors:</p>
					{requestErrors.map((error) => (
						<li key={error.message}>{error.message}</li>
					))}
				</div>
			);
		}
	};

	return { makeRequest, errors };
};

export default useRequest;
