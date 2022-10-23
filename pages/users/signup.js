import Link from 'next/link'
import SignupForm from '../../components/SignUpForm'


export default function SignUp() {
	return (
		<div>
			<SignupForm/>
			<p>Already have an account? <Link href="/users/signin"><a>Sign in</a></Link></p>
		</div>
	)
}