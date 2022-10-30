import { signOut } from 'firebase/auth'
import { auth } from '../utils/firebase-config'
import useAuthContext from '../utils/useAuthContext'

const SignOutButton = () => {
	const {currentUser, setUsername} = useAuthContext()
	function logOut () {
		signOut(auth).then(() => setUsename(null)).catch((err) => console.log(err))
	}
	return(
		<>
			<button onClick={logOut}>
				Sign out
			</button>
		</>
	)
}

export default SignOutButton