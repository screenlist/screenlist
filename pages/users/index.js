import Link from 'next/link'
import useAuthContext from '../../utils/useAuthContext'

const User = () => {
	const {currentUser, setCurrentUser} = useAuthContext()
	console.log(currentUser)
	return (
		<div>
			{
				currentUser ?
				(
					<section>
						<h1>{currentUser.userName}</h1>
						<p>email: {currentUser.email}</p>
					</section>
				) : <Link href="/users/signin">Sign in</Link>
			}
		</div>
	)
}

export default User