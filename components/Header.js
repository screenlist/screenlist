import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import styles from '../styles/Header.module.css'
import SignOutButton from './SignOutButton'
import useAuthContext from '../utils/useAuthContext'

const Header = () => {
	const {currentUser, username} = useAuthContext()
	const router = useRouter()
	return(
		<header>
			<nav role='main menu' className={styles.navContainer} >
				<ul className={styles.list}>
					<li>
						<div className={styles.logo} >
							<Link href='/'>
								<a title="Home">
									<Image
										src='/screenlist.svg'
										alt="logo"
										width={100}
										height={68}
									/>
								</a>
							</Link>
						</div>
					</li>
					<li>
						<ul className={`${styles.list} ${styles.nestedList}`} >
							<li>
								<div>
									<Link href='/contribute'>
										<a className={styles.mainNavLink} >
											<Image 
												src="/contribute-icon.svg"
												alt="contribute icon"
												width={40}
												height={40}
											/>
										</a>
									</Link>
								</div>
							</li>
							<li>
								<div>
									<Link href={currentUser && username ? `/users/${username}` : '/users/signin'} >
										<a className={styles.mainNavLink} >
											<Image 
												src="/user-profile-icon.svg"
												alt="user profile icon"
												width={45}
												height={45}
											/>
										</a>
									</Link>
								</div>
							</li>
						</ul>
					</li>
				</ul>
			</nav>
			<nav role="secondary menu" className={styles.secondNavContainer}>
				<ul className={styles.secondNavList}>
					<li>
						<Link href='/films'>
							<a className={styles.navLink} >Films</a>
						</Link>
					</li>
					<li>
						<Link href='/series'>
							<a className={styles.navLink} >Series</a>
						</Link>
					</li>
					<li>
						<Link href='/people'>
							<a className={styles.navLink} >People</a>
						</Link>
					</li>
					<li>
						<Link href='/companies'>
							<a className={styles.navLink} >Companies</a>
						</Link>
					</li>
				</ul>
			</nav>
			{
				currentUser?.emailVerified == false && username ? (
					<div className="notice" role="important notice">
						<Link href={`/users/verify-email`} >
							<a>Please verify your email to use the site without heavy restrictions.</a>
						</Link>
					</div>
				) : null
			}
		</header>
	)
}

export default Header