import Link from 'next/link'
import styles from '../styles/Header.module.css'

const Header = () => {
	return(
		<header>
			<nav role="main menu">
				<ul>
					<li>
						<Link href="#">
							<a>Screen List</a>
						</Link>
					</li>
					<li>
						<Link href="#">
							<a>Search</a>
						</Link>
					</li>
					<li>
						<div>
							<Link href="#">
								<a>Contribute</a>
							</Link>
						</div>
						<div>
							<Link href="#">
								<a>Sign In</a>
							</Link>
						</div>
					</li>
				</ul>
			</nav>
		</header>
	)
}

export default Header