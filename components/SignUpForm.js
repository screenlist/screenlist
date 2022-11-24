import {
	createUserWithEmailAndPassword,
	onAuthStateChanged,
	sendEmailVerification
} from 'firebase/auth';
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import * as Yup from 'yup'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { auth } from '../utils/firebase-config'
import useAuthContext from '../utils/useAuthContext'
import LoadingState from './LoadingState'

const SignupForm = () => {
	const baseUrl = process.env.NEXT_PUBLIC_SERVER
	const [serverError, setServerError] = useState(null)
	const [loading, setLoading] = useState(false)
	const {currentUser} = useAuthContext()
	const router = useRouter()

	return (
		<Formik
			initialValues={{email: '', password: ''}}
			validationSchema={Yup.object({
				email: Yup.string().email('Invalid email address').required('Required'),
				password: Yup.string().min(8, 'Minimum length must be 8 characters').required('Required'),
			})}
			onSubmit={(values, { setErrors }) => {
				setLoading(true)
				createUserWithEmailAndPassword(auth, values.email, values.password).then((credential) => {
					router.push('/users/setup-profile')
				}).catch((err) => {
					setLoading(false)
					setServerError(err.message)
				})
			}}
		>
			<Form className="form" > 
				{loading && <LoadingState/>}
				<h1 className="heading-one">Create an account</h1>
				
				{ serverError ? <div className="error">{serverError}</div> : null }
				<div className="form-field">
					<label htmlFor= "email">Email</label>
					<Field name= "email" type= "email" />
					<div className="error">
						<ErrorMessage name="email" />
					</div>
				</div>

				<div className="form-field">
					<label htmlFor= "password">Password</label>
					<Field name= "password" type= "password" />
					<div className="error">
						<ErrorMessage name="password" />
					</div>
				</div>

				<button className="form-submit" type="submit">Sign up</button>

				<p>Already have an account? <Link href="/users/signin"><a className="link">Sign in</a></Link></p>
			</Form>
		</Formik>
	)
}

export default SignupForm