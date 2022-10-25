import {
	createUserWithEmailAndPassword,
	onAuthStateChanged,
	sendEmailVerification
} from 'firebase/auth';
import { useState } from 'react';
import { useRouter } from 'next/router'
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { auth } from '../utils/firebase-config';
import useAuthContext from '../utils/useAuthContext'

const SignupForm = () => {
	const baseUrl = process.env.NEXT_PUBLIC_SERVER
	const [authError, setAuthError] = useState(null)
	const {currentUser, setCurrentUser} = useAuthContext()
	const router = useRouter()

	useEffect(() => {
		if(currentUser){
			router.push('/users/verify')
		}
	}, [currentUser])

	return (
		<Formik
			initialValues={{email: '', password: '', username: ''}}
			validationSchema={Yup.object({
				email: Yup.string().email('Invalid email address').required('Required'),
				password: Yup.string().min(8, 'Minimum length must be 8 characters').required('Required'),
				username: Yup.string().required('Required')
			})}
			onSubmit={async (values, { setErrors }) => {
				try{
					const {user} = await createUserWithEmailAndPassword(auth, values.email, values.password)
					const token = await auth.currentUser.getIdToken()
					console.log('from sign up submit', token)
					console.log(user)
					
					const createUser = {
						uid: user.uid,
						userName: values.username
					}

					const requestConfig = {
						method: 'POST',
						headers: {
							AuthorizationToken: token,
							'Content-Type': 'application/json'
						},
						body: JSON.stringify(createUser)
					}

					if(user){
						try {
							const token = await auth.currentUser.getIdToken(true)
							const getAuth = await fetch(`${baseUrl}/users/register`, requestConfig)
							const nameObject = await getAuth.json()
							console.log(nameObject)
							console.log({tokek: token})
							const currentUser = {
								userName: nameObject.userName,
								email: user.email,
								emailVerified: user.emailVerified,
								photoUrl: user.photoUrl,
								uid: user.uid
							}
							nameObject.userName ? setCurrentUser(currentUser) : setCurrentUser(null)
						} catch {
							setCurrentUser(null)
						}
					} else {
						setCurrentUser(null)
						return null
					}
				} catch(err) {
					setAuthError(err.message)
				}
			}}
		>
			<Form>
				{ authError ? <div>`${authError}`</div> : null }

				<label htmlFor= "username">Username</label>
				<Field name= "username" type= "text" />
				<ErrorMessage name= "username" />

				<label htmlFor= "email">Email</label>
				<Field name= "email" type= "email" />
				<ErrorMessage name= "email" />

				<label htmlFor= "password">Password</label>
				<Field name= "password" type= "password" />
				<ErrorMessage name= "password" />

				<button type="submit">Sign up</button>
			</Form>
		</Formik>
	)
}

export default SignupForm