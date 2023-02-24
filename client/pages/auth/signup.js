import { useState } from 'react';
import axios from 'axios';

const SignUp = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [validationErrors, setValidationErrors] = useState([]);

	const onSubmit = async (event) => {
		event.preventDefault();
		try {
			const response = await axios.post('/api/users/signup', {
				email,
				password,
			});
			console.log(response.data);
		} catch (error) {
			setValidationErrors(error.response.data.errors);
		}
	};

	return (
		<form onSubmit={onSubmit}>
			<h1>Sign Up</h1>
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
			<button className="btn btn-primary">Sign Up</button>
			{validationErrors.length > 0 && (
				<div className="alert alert-danger" style={{ marginTop: '10px' }}>
					<h4>Whoops Signup Failed</h4>
					<p>See below for errors:</p>
					{validationErrors.map((error) => (
						<li key={error.message}>{error.message}</li>
					))}
				</div>
			)}
		</form>
	);
};

export default SignUp;
