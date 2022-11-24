import { 
	getAuth, 
	reauthenticateWithCredential,
	signInWithEmailAndPassword,
	EmailAuthProvider,
	deleteUser
} from 'firebase/auth'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import * as Yup from 'yup'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { auth } from '../utils/firebase-config'
import useAuthContext from '../utils/useAuthContext'
import { baseUrl } from '../utils/fetch'
import styles from '../styles/ProfileSettings.module.css'
import SignOutButton from './SignOutButton'

const ReAuthDelete = () => {
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
					const cred = EmailAuthProvider.credential(values.email, values.password)
					// console.log(cred)

					reauthenticateWithCredential(currentUser, cred).then(async () => {
						// console.log("it hits")
						try {
							const token = await auth.currentUser.getIdToken(true)
							fetch(`${baseUrl}/users/delete`, {
								method: 'DELETE',
								headers: {
									AuthorizationToken: token
								}
							}).then((res) => {
								if(!res.ok){
									const errorObject = res.json()
									throw new Error(errorObject)
								} else {
									return res.json()
								}
							}).then((data) => {
								const user = auth.currentUser
								deleteUser(user).then(() => {
									router.push('/users/signup')
								}).catch(() => {
									setServerError('Could not delete account, please try again')
								})
							}).catch(() => {
								setServerError("Could not delete your account data, please try again.")
							})
						} catch (err) {
							setServerError("Encountered an authentication error.")
						}
					}).catch((err) => {
						setServerError("Wrong password or email.")
					})		
			}}
		>
			<Form className="form">
				<h4 className="danger">Deleting your acoount is a destructive and irreversible action!</h4>
				{ serverError && <div className="error">{serverError}</div>}

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

				<button className="button-danger" type="submit">Confirm</button>
			</Form>
		</Formik>
	)
}

const ProfileSettings = () => {
	const {currentUser, username, setUsername} = useAuthContext()
	const [deleteForm, setDeleteForm] = useState(false)

	const deleteState = () => {setDeleteForm(!deleteForm)}
	return (
		<section className={styles.settingsContainer}>
			<h3>Settings</h3>
			<div className="grouped-buttons">
				<Link href={`/users/${username}/edit`} ><a className="button-regular">Edit Profile</a></Link>
				<SignOutButton/>
			</div>
			<div className={styles.headingInfo}>
				<h4>Email</h4>
				<p>{currentUser?.email ? currentUser.email : "No email"}</p>
			</div>
			<div className={styles.headingInfo}>
				<h4>Email verification</h4>
				<p>{currentUser?.emailVerified ? "Verified" : "Not verified"}</p>
			</div>
			<div>
				<button className={deleteForm ? "button-regular" : "button-danger"} onClick={deleteState}>{deleteForm ? "Cancel" : "Delete account"}</button>
				{deleteForm && <ReAuthDelete />}
			</div>
		</section>
	)
}

export default ProfileSettings