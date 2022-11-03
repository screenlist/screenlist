import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { sendEmailVerification } from 'firebase/auth'
import { auth } from '../../utils/firebase-config'
import useAuthContext from '../../utils/useAuthContext'
import LoadingState from '../../components/LoadingState'


const VerifyEmail = () => {
	const { currentUser, username } = useAuthContext()
	const [isSent, setIsSent] = useState(false)

	const router = useRouter()

	

	const send = () => {
		setIsSent(false)
		sendEmailVerification(auth.currentUser).then(() => {
			setIsSent(true)
		}).catch((err) => {console.log(err)})
	}

	
	if(!currentUser){
		useEffect(() => {
			router.push('/users/signin')
		}, [])

		return <LoadingState />
	}

	if(currentUser?.emailVerified){

		return (
			<section>
				<h1>This email is verified, thank you.</h1>
			</section>
		)
	}

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