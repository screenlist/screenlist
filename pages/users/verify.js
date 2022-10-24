import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { sendEmailVerification } from 'firebase/auth'
import { auth } from '../../utils/firebase-config'
import useAuthContext from '../../utils/useAuthContext'


const VerifyEmail = () => {
	const { currentUser, setCurrentUser } = useAuthContext()
	const [isSent, setIsSent] = useState(false)

	const router = useRouter()

	

	const send = () => {
		setIsSent(false)
		sendEmailVerification(auth.currentUser).then(() => {
			setIsSent(true)
		})
	}

	useEffect(() => {
		if(!currentUser){
			router.push('/users/signin')
		} else if(currentUser.emailVerified === true){
			router.push('/profile')
		} else {
			send()
		}
	}, [])

	return (
		<section>
			<h1>Verify your email address</h1>
			<h2>Status: {isSent ? 'sent' : 'not delivered yet'}</h2>
			<p>An email with a verification link has been sent to the email address you provided during your sign up</p>
			<div>
				<p>Taking too long or didn't receive email?</p>
				<button onClick={send} >Resend Email</button>
			</div>
		</section>
	)
}

export default VerifyEmail