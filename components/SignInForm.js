import { 
	getAuth, 
	signInWithEmailAndPassword,
	onAuthStateChanged
} from 'firebase/auth';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { auth } from '../utils/firebase-config';
import useAuthContext from '../utils/useAuthContext'

const SigninForm = () => {
	const baseUrl = process.env.NEXT_PUBLIC_SERVER
	const [authError, setAuthError] = useState(null)
	const {currentUser, setCurrentUser} = useAuthContext()
	const router = useRouter()

	useEffect(() => {
		if(currentUser){
			router.push('/profile')
		}
	}, [currentUser])

	return (
		<Formik
			initialValues={{email: '', password: ''}}

			validationSchema={Yup.object({
				email: Yup.string().email('Invalid email address').required('Required'),
				password: Yup.string().required('Required')
			})}

			onSubmit={async (values, { setErrors }) => {
				try{
					await signInWithEmailAndPassword(auth, values.email, values.password)
					console.log('it runs')
					const user = auth.currentUser

					if(user){
						try {
							console.log(user)
							const token = await auth.currentUser.getIdToken(true)
							const getAuth = await fetch(`${baseUrl}/users/auth`, {
								method: 'POST',
								headers: {
									AuthorizationToken: token
								}
							})
							const nameObject = await getAuth.json()
							console.log(nameObject)
							console.log({tokek: token})
							const currentUser = {
								displayName: user.displayName,
								userName: nameObject.userName,
								email: user.email,
								emailVerified: user.emailVerified,
								photoUrl: user.photoUrl,
								uid: user.uid
							}
							nameObject.userName ? setCurrentUser(currentUser) : setCurrentUser(null)
						} catch(err) {
							console.log(err)
							setCurrentUser(null)
						}
					} else {
						console.log('there is not user')
						setCurrentUser(null)
						return null
					}
				} catch(err) {
					setAuthError("Invalid email or password")
				}
			}}
		>
			<Form>
				{ authError ? <div>`${authError}`</div> : null }

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