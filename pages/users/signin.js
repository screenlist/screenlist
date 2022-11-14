import Link from 'next/link'
import SigninForm from '../../components/SignInForm'


export default function SignIn() {
	return (
		<div className="form-page" >
			<SigninForm/>
			<p>Don't have an account? <Link href="/users/signup"><a className="link">Sign up</a></Link></p>
		</div>
	)
}