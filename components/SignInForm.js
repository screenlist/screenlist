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
				signInWithEmailAndPassword(auth, values.email, values.password).then((credentials) => {
					const user = auth.currentUser.reload()

					if(!user.emallVerified){
						router.push('/users/verify')
						return setServerError('Redirecting...')
					}

					const token = auth.currentUser.getIdToken(true)
					console.log(token)
					fetch(`${baseUrl}/users/auth`, {
						method: 'POST',
						headers: {
							AuthorizationToken: token
						}
					}).then((res) => {res.json()}).then((data) => {
						setUsername(data.username)
						router.push(`/users/${data.username}`)
					}).catch((err) => { setServerError(err.message) })
				}).catch((err) => { setServerError(err.message) })				
			}}
		>
			<Form>
				<h2>Sign in</h2>
				{ serverError ? <div>`${serverError}`</div> : null }

				<label htmlFor= "email">Email</label>
				<Field name= "email" type= "email" />
				<ErrorMessage name= "email" />

				<label htmlFor= "password">Password</label>
				<Field name= "password" type= "password" />
				<ErrorMessage name= "password" />

				<button type="submit">Sign in</button>
			</Form>
		</Formik>
	)
}

export default SigninForm