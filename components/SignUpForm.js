import {
	createUserWithEmailAndPassword,
	onAuthStateChanged,
	sendEmailVerification
} from 'firebase/auth';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { auth } from '../utils/firebase-config';
import useAuthContext from '../utils/useAuthContext'

const SignupForm = () => {
	const baseUrl = process.env.NEXT_PUBLIC_SERVER
	const [serverError, setServerError] = useState(null)
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

				createUserWithEmailAndPassword(auth, values.email, values.password).then((credential) => {
					router.push('/users/setup-profile')
				}).catch((err) => {
					setServerError(err.message)
				})
			}}
		>
			<Form className="form" > 
				<h1 className="heading-one">Create an account</h1>
				
				{ serverError ? <div className="error">`${serverError}`</div> : null }
				<div className="form-field">
					<label htmlFor= "email">Email</label>
					<Field name= "email" type= "email" />
					<ErrorMessage name= "email" />
				</div>

				<div className="form-field">
					<label htmlFor= "password">Password</label>
					<Field name= "password" type= "password" />
					<ErrorMessage name= "password" />
				</div>

				<button type="submit">Sign up</button>
			</Form>
		</Formik>
	)
}

export default SignupForm