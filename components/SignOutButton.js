import { signOut } from 'firebase/auth'
import { auth } from '../utils/firebase-config'
import useAuthContext from '../utils/useAuthContext'

const SignOutButton = () => {
	const {currentUser, setCurrentUser} = useAuthContext()
	function logOut () {
		signOut(auth).then(() => setCurrentUser(null)).catch((err) => console.log(err))
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