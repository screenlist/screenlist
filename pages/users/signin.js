import Link from 'next/link'
import SigninForm from '../../components/SignInForm'


export default function SignIn() {
	return (
		<div>
			<SigninForm/>
			<p>Don't have an account? <Link href="/users/signup"><a>Sign up</a></Link></p>
		</div>
	)
}