import { 
	getAuth, 
	signInWithEmailAndPassword,
	onAuthStateChanged
} from 'firebase/auth'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import * as Yup from 'yup'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { auth } from '../utils/firebase-config'
import useAuthContext from '../utils/useAuthContext'
import styles from '../styles/SignInForm.module.css'

const SigninForm = () => {
	const baseUrl = process.env.NEXT_PUBLIC_SERVER
	const [serverError, setServerError] = useState(null)
	const {currentUser, username, setUsername} = useAuthContext()
	const router = useRouter()


	return (
		<Formik
			initialValues={{email: '', password: ''}}

			validationSchema={Yup.object({
				email: Yup.string().email('Invalid email address').required('Required'),
				password: Yup.string().required('Required')
			})}

			onSubmit={(values, { setErrors }) => {
				signInWithEmailAndPassword(auth, values.email, values.password).then(async (credentials) => {
					const user = credentials.user

					if(!user.emailVerified){
						router.push('/users/verify-email')
						return null
					}

					const token = await auth.currentUser.getIdToken(true)
					fetch(`${baseUrl}/users/auth`, {
						method: 'POST',
						headers: {
							AuthorizationToken: token
						}
					}).then((res) => res.json()).then((data) => {
						setUsername(data.username)
						router.push(`/users/${data.username}`)
					}).catch((err) => { 
						console.log(err)
						if(err.status == 404){
							router.push('/users/setup-profile')
						}
						setServerError(err.message) 
					})
				}).catch((err) => { setServerError(err.message) })				
			}}
		>
			<Form className="form">
				<h1 className="heading-one">Sign in</h1>
				{ serverError ? <div>`${serverError}`</div> : null }
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

				<button type="submit">Sign in</button>
			</Form>
		</Formik>
	)
}

export default SigninForm