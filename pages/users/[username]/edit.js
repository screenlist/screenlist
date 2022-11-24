import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import useSWR from 'swr'
import * as Yup from 'yup'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { baseUrl, fetcher, getOneItem } from '../../../utils/fetch'
import LoadingState from '../../../components/LoadingState'
import useAuthContext from '../../../utils/useAuthContext'
import { auth } from '../../../utils/firebase-config'

const CreateUsernameBio = ({user}) => {

	const [name, setName] = useState('')
	const [serverError, setServerError] = useState(null)
	const [userExists, setUserExists] = useState()
	const router = useRouter()
	const {currentUser, username, setUsername} = useAuthContext()	

	// useEffect(() => {
	// 	if(!currentUser || !username){
	// 		router.push('/users/signin')
	// 	}
	// }, [username, currentUser])

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

	if(!currentUser || !username){
		return <LoadingState page='true' />
	}	

	const fields = {
		username: user.userName,
		bio: user.bio
	}

	return (
		<section className="form-page">
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
					const requestConfig = {
						method: 'PATCH',
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
						const response = await fetch(`${baseUrl}/users/${username}`, requestConfig)
						const data = await response.json()
						console.log(data)
						if(data.username){
							setUsername(data.username)
							router.push(`/users/${data.username}`)
						}

						if(data.statusCode){
							setServerError(data.message)
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
					<h2>Edit profile</h2>

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

					<div className="grouped-buttons">
						<button className="button-good" type="submit">Save</button>
						<button type="button" className="button-regular" onClick={() => router.back()} >Cancel</button>
					</div>
				</Form>
			</Formik>
		</section>
	)
}

export async function getServerSideProps(context) {
	const { username } = context.params
	const user = await getOneItem(username, 'users')

	return {
		props: { user }
	}
}

export default CreateUsernameBio