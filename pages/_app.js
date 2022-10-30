import '../styles/globals.css'
import Layout from '../components/Layout'
import AuthProvider from '../utils/AuthProvider'
import { useState, useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../utils/firebase-config'

function MyApp({ Component, pageProps }) {
	const [currentUser, setCurrentUser] = useState(null)
	const [username, setUsername] =useState(null)

	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			setCurrentUser(user)
		})
	}, [])

	return(
		<AuthProvider value={{currentUser, username, setUsername}} >
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</AuthProvider>
	)
}

export default MyApp
