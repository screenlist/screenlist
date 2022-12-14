import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { sendEmailVerification, signOut } from 'firebase/auth'
import { auth } from '../../utils/firebase-config'
import useAuthContext from '../../utils/useAuthContext'
import LoadingState from '../../components/LoadingState'


const VerifyEmail = () => {
	const { currentUser, username, setUsername } = useAuthContext()
	const [isSent, setIsSent] = useState(false)

	const router = useRouter()	

	const send = () => {
		setIsSent(false)
		sendEmailVerification(auth.currentUser).then(() => {
			setIsSent(true)
			signOut(auth).then(() => {
				setUsername(null)
				router.push('/users/email-verification-sent')
			}).catch((err) => console.log(err))
		}).catch((err) => {console.log(err)})
	}

	useEffect(() => {
		if(currentUser && !currentUser?.emailVerified){
			send()
		}		
	}, [currentUser])

	// useEffect(() => {
	// 	if(!currentUser && !isSent){
	// 		router.push('/users/signin')
	// 	}		
	// }, [])

	if(currentUser?.emailVerified){

		return (
			<section className="form-page">
				<h1>This email is verified, thank you.</h1>
			</section>
		)
	}

	return (
		<section>
			<h1>Sending verification email</h1>
			<LoadingState />
		</section>
	)
}

export default VerifyEmail