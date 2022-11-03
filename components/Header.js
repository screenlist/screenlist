import Link from 'next/link'
import Image from 'next/image'
import styles from '../styles/Header.module.css'
import SignOutButton from './SignOutButton'
import useAuthContext from '../utils/useAuthContext'

const Header = () => {
	const {currentUser, username} = useAuthContext()
	return(
		<header>
			<nav role='main menu'>
				<ul>
					<li>
						<Link href='/'>
							<a title="Home">
								<Image
									src='/screenlist.svg'
									alt="logo"
									width={60}
									height={50}
								/>
							</a>
						</Link>
					</li>
					<li>
						<Link href='/films'>
							<a>Films</a>
						</Link>
					</li>
					<li>
						<Link href='/series'>
							<a>Series</a>
						</Link>
					</li>
					<li>
						<div>
							<Link href='/contribute'>
								<a>Contribute</a>
							</Link>
						</div>
					</li>
					<li>
						<div>
							<Link href={currentUser && username ? `/users/${username}` : '/users/signin'} >
								<a>Profile</a>
							</Link>
						</div>
					</li>
				</ul>
			</nav>
		</header>
	)
}

export default Header