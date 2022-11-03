import '../styles/globals.css'
import Layout from '../components/Layout'
import AuthProvider from '../utils/AuthProvider'
import { useState, useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../utils/firebase-config'

function MyApp({ Component, pageProps }) {
	return(
		<AuthProvider>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</AuthProvider>
	)
}

export default MyApp
