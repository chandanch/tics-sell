import Link from 'next/link';

const Header = ({ currentUser }) => {
	const links = [
		!currentUser && {
			label: 'Sign Up',
			href: '/auth/signup',
		},
		!currentUser && {
			label: 'Sign In',
			href: '/auth/signin',
		},
		currentUser && {
			label: 'Sign Out',
			href: '/auth/signout',
		},
	]
		.filter((link) => link)
		.map(({ label, href }) => {
			return (
				<li className="nav-item" key={href}>
					<Link className="nav-link" href={href}>
						{label}
					</Link>
				</li>
			);
		});

	return (
		<nav className="navbar navbar-light bg-light">
			<Link legacyBehavior href="/">
				<a className="navbar-brand">Tics Sell</a>
			</Link>
			<div className="d-flex justify-content-end">
				<ul className="nav d-flex align-items-center">{links}</ul>
			</div>
		</nav>
	);
};

export default Header;
