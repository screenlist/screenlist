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
		if(!currentUser){
			router.push('/users/signin')
		}
	}, [])

	useEffect(() => {
		const search = async () => {
			console.log(name)
			try {
				const res = await fetch(`${baseUrl}/users/search?q=${name}`)
				const data = await res.json()
				console.log(data)
				setUserExists(data)					
			} catch(err){
				setServerError(err.message)
			}
		}

		return () => search()
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
						setErrors({username: "Username already taken"})
						return null
					}
					
					const token = await auth.currentUser.getIdToken(true)
					console.log(values.username, token.slice(0,10))
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

					try {
						const response = await fetch(`${baseUrl}/users/register`, requestConfig)
						const data = await response.json()
						console.log(data)
						if(data.username){
							setUsername(data.username)
							router.push(`/users/${data.username}`)
						}
					} catch(err) {
						console.log(err.message)
						setServerError(err.message)
					}
				}}
			>
				<Form
					className="form"
					onChange={(values) => {
						if(values.target.name =='username'){
							setName(values.target.value)
						}
					}}
				>
					<h2>Set up profile</h2>

					{serverError && <p className="error">{serverError}</p>}

					<div className="form-field">
						<label htmlFor="username">Username</label>
						<Field name="username" type="text" />
						<div className="error">
							<ErrorMessage name="username" />
						</div>
					</div>

					<div className="form-field">
						<label htmlFor="bio">Bio</label>
						<Field name="bio" type="textarea" />
						<div className="error">
							<ErrorMessage name="bio" />
						</div>
					</div>

					<button className="form-submit" type="submit">Create</button>
				</Form>
			</Formik>
		</section>
	)
}

export default CreateUsernameBio