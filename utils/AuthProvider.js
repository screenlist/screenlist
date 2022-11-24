import { useState, useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import AuthContext from './AuthContext'
import { baseUrl } from './fetch'
import { auth } from '../utils/firebase-config'



const AuthProvider = ({ children, value }) => {	
	const [currentUser, setCurrentUser] = useState(null)
	const [username, setUsername] = useState(null)
	const [role, setRole] = useState(null)

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, async (user) => {
			if(user){
				console.log('auth changed'+' at '+new Date())	
				setCurrentUser(user)

				user.getIdToken(true).then((idToken) => {
					// To keep the username accurate
					fetch(`${baseUrl}/users/auth`, {
						method: 'POST',
						headers: {
							AuthorizationToken: idToken
						}
					}).then((res) => res.json()).then((data) => {
						setUsername(data.username)
						setRole(data.role)
					}).catch((err) => {
						setUsername(null)
						if(err.status == 404){
							router.push('/users/setup-profile')
						} 
					})
				}).catch((err) => {})				
			} else {
				console.log('not authenticated')
				setUsername(null)
				setCurrentUser(null)
				setRole(null)
			}
		})

		return () => unsubscribe()
	}, [])

	return (
		<AuthContext.Provider value={{currentUser, username, setUsername, role, setRole}}>{children}</AuthContext.Provider>
	)
}

export default AuthProvider