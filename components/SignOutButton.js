import { signOut } from 'firebase/auth'
import { useRouter } from 'next/router'
import { auth } from '../utils/firebase-config'
import useAuthContext from '../utils/useAuthContext'

const SignOutButton = () => {
	const {currentUser, setUsername} = useAuthContext()
	const router = useRouter()
	function logOut () {
		signOut(auth).then(() => {
			setUsername(null)
			router.push('/')
		}).catch((err) => console.log(err))
	}
	return(
		<>
			<button className="button-awe" onClick={logOut}>
				Sign out
			</button>
		</>
	)
}

export default SignOutButton