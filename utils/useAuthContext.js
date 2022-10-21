import { useContext } from 'react'
import AuthContext from './AuthContext'

const useAuthContext = () => {
	const currentUser = useContext(AuthContext)

	if (currentUser === undefined) {
		throw new Error("useAuthContext can only be used inside AuthProvider")
	}

	return currentUser
}

export default useAuthContext