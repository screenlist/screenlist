import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import * as Yup from 'yup'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { baseUrl } from '../utils/fetch'
import LoadingState from './LoadingState'
import useAuthContext from '../utils/useAuthContext'
import { auth } from '../utils/firebase-config';

const CreateUsernameBio = () => {

	const [name, setName] = useState('')
	const [serverError, setServerError] = useState(null)
	const [userExists, setUserExists] = useState()
	const router = useRouter()
	const {currentUser, setUsername} = useAuthContext()

	useEffect(() => {
		!currentUser ? router.push('/users/signin') : null
	}, [])

	useEffect(() => {
		if(!name){
			return null
		}

		fetch(`/users/search?q=${name}`).then((res) => {
			res.json()
		}).then((data) => {
			setUserExists(data)
		}).catch((err) => {
			setServerError(err.message)
		})
	}, [name])

	if(!currentUser){
		return <LoadingState />
	}

	const fields = {
		username: '',
		bio: ''
	}

	return (
		<section>
			<Formik
				initialValues={fields}
				validationSchema={Yup.object({
					username: Yup.string().max(60, 'Names are too long').required('Required'),
					bio: Yup.string().max(250, 'Bio is too long')
				})}
				onSubmit={async (values, { setErrors }) => {

					if(userExists){
						return setErrors({username: "Username already taken"})
					}

					const token = auth.currentUser.getIdToken(true)

					const requestConfig = {
						method: 'POST',
						headers: {
							AuthorizationToken: token,
							'Content-Type': 'application/json'
						},
						body: JSON.stringify({
							userName: values.username,
							bio: values.bio
						})
					}

					fetch(`${baseUrl}/users/register`, requestConfig).then((res) => {
						res.json()
					}).then((data) => {
						setUsername(data.username)
						router.push(`/users/${data.username}`)
					}).catch((err) => {
						setServerError(err.message)
					})
				}}
			>
				<Form
					onChange={(values) => {
						if(values.target.name =='name'){
							setName(values.target.value)
						}
					}}
				>
					<h2>Set up profile</h2>

					{serverError && <p>{serverError}</p>}

					<label htmlFor="username">Username</label>
					<Field name="username" type="text" />
					<ErrorMessage name="username" />

					<label htmlFor="bio">Bio</label>
					<Field name="bio" type="textarea" />
					<ErrorMessage name="bio" />
				</Form>
			</Formik>
		</section>
	)
}

export default CreateUsernameBio