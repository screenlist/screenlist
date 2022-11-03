import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import AuthContext from './AuthContext';
import { auth } from '../utils/firebase-config';



const AuthProvider = ({ children, value }) => {	
	const [currentUser, setCurrentUser] = useState(null)
	const [username, setUsername] =useState(null)

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if(user){
				console.log('auth changed'+' at '+new Date(), user.email, username)
				setCurrentUser(user)
			} else {
				console.log('not authenticated')
				setUsername(null)
				setCurrentUser(null)
			}
		})

		return () => unsubscribe()
	}, [])

	return (
		<AuthContext.Provider value={{currentUser, username, setUsername}}>{children}</AuthContext.Provider>
	)
}

export default AuthProvider