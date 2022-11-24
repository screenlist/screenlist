import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { sendEmailVerification, signOut } from 'firebase/auth'
import { auth } from '../../utils/firebase-config'
import useAuthContext from '../../utils/useAuthContext'
import LoadingState from '../../components/LoadingState'


const EmailVerificationSent = () => {
	const { currentUser, username, setUsername } = useAuthContext()
	const [isSent, setIsSent] = useState(false)

	const router = useRouter()

	const send = () => {
		router.push('/users/verify-email')
	}

	if(currentUser?.emailVerified){

		return (
			<section className="form-page">
				<h1>This email is verified, thank you.</h1>
			</section>
		)
	}

	return (
		<section>
			<h1>Sent</h1>
			<p>An email with a verification link has been sent to the email address you provided during your sign up</p>
		</section>
	)
}

export default EmailVerificationSent