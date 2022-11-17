import { 
	getAuth, 
	signInWithEmailAndPassword,
	onAuthStateChanged
} from 'firebase/auth'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import * as Yup from 'yup'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { auth } from '../utils/firebase-config'
import useAuthContext from '../utils/useAuthContext'
import styles from '../styles/SignInForm.module.css'
import LoadingState from './LoadingState'

const SigninForm = () => {
	const baseUrl = process.env.NEXT_PUBLIC_SERVER
	const [serverError, setServerError] = useState(null)
	const [loading, setLoading] = useState(false)
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
				setLoading(true)
				signInWithEmailAndPassword(auth, values.email, values.password).then(async (credentials) => {
					const user = credentials.user

					if(!user.emailVerified){
						router.push('/users/verify-email')
						return null
					}

					auth.currentUser.getIdToken(true).then((token) => {
						fetch(`${baseUrl}/users/auth`, {
							method: 'POST',
							headers: {
								AuthorizationToken: token
							}
						}).then((res) => {
							if(!res.ok){
								throw new Error("Authentication failed.")
							}
							return res.json()
						}).then((data) => {
							if(data.username){
								setUsername(data.username)
								router.push(`/users/${data.username}`)
							} else {
								console.log(data)
								if(data.statusCode == 404){
									router.push('/users/setup-profile')
									return null
								}
								setServerError(data.message)
							}
						}).catch((err) => { 
							console.log(err)
							if(err.statusCode == 404){
								router.push('/users/setup-profile')
							}
							setLoading(false)
							setServerError(err.message) 
						})
					}).catch((err) => {
						setLoading(false)
						setServerError("Login failed, please try again.")
					})					
				}).catch((err) => { 
					setServerError(err.message) 
					setLoading(false)
				})				
			}}
		>
			<Form className="form">
				{loading && <LoadingState/>}
				<h1 className="heading-one">Sign in</h1>
				{ serverError ? <div className="error">{serverError}</div> : null }
				<div className="form-field">
					<label htmlFor= "email">Email</label>
					<Field name= "email" type= "email" />
					<div className="error">
						<ErrorMessage name="name" />
					</div>
				</div>
				<div className="form-field">
					<label htmlFor= "password">Password</label>
					<Field name= "password" type= "password" />
					<div className="error">
						<ErrorMessage name="name" />
					</div>
				</div>

				<button disabled={loading ? true : false} className="form-submit" type="submit">Sign in</button>

				<p>Don't have an account? <Link href="/users/signup"><a className="link">Sign up</a></Link></p>
			</Form>
		</Formik>
	)
}

export default SigninForm