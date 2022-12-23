import { useState, useEffect } from 'react'
import * as Yup from 'yup'
import { useRouter } from 'next/router'
import { Formik, Form, Field, ErrorMessage, useFormikContext } from 'formik'
import { baseUrl } from '../utils/fetch'
import SearchSimilarResources from './SearchSimilarResources'
import LoadingState from './LoadingState'
import useAuthContext from '../utils/useAuthContext'

const CreatePeopleForm = ({setterFunction, nested, field}) => {

	const [name, setName] = useState('')
	const [loading, setLoading] = useState(false)
	const [isError, setIsError] = useState(null)
	const {currentUser, username} = useAuthContext()
	const { setFieldValue } = useFormikContext()
	const router = useRouter()

	const fields = {
		name: '',
		description: '',
		website: ''
	}

	return (
		<section>
			<Formik
				initialValues={fields}
				validationSchema={Yup.object({
					name: Yup.string().max(60, 'Names are too long').required('Required'),
					description: Yup.string().max(500, 'Description is too long'),
					website: Yup.string()
				})}
				onSubmit={async (values, { setErrors }) => {
					setLoading(true)
					try{
						const cleanValues = Object.fromEntries(Object.entries(values).filter(([_, value]) => value != ""))
						
						const token = await currentUser.getIdToken(true)
							
						const requestConfig = {
							method: 'POST',
							headers: {
								AuthorizationToken: token,
								'Content-Type': 'application/json'
							},
							body: JSON.stringify(cleanValues)
						}

						console.log(data)
						const response = await fetch(`${baseUrl}/people`, requestConfig)
						const data = await response.json() 
						if(!response.ok){							
							throw new Error(data.message)
						}

						if(nested){
							setterFunction(data)
							setFieldValue(field, data.name)
						} else {
							router.push(`/people/${data.id}`)
						}
					} catch(err) {
						setLoading(false)
						setIsError(err.message)
					}
				}}
			>
				<Form
					className="form"
					onChange={(values) => {
						if(values.target.name =='name'){
							setName(values.target.value)
						}
					}}
				>
					{loading && <LoadingState />}
					<h2>Add a new person</h2>
					
					{isError && <p className="error">{isError}</p>}
					<div className="form-field">					
						<label htmlFor="name">Name</label>
						<Field name="name" type="text" />
						<div className="error">
							<ErrorMessage name="name" />
						</div>
					</div>
					
					<div className="form-field">
						<label htmlFor="description">Decription</label>
						<Field name="description" as="textarea" />
						<div className="error">
							<ErrorMessage name="description" />
						</div>
					</div>
					
					<div className="form-field">
						<label htmlFor="website">Website</label>
						<Field name="website" type="text" />
						<div className="error">
							<ErrorMessage name="website" />
						</div>
					</div>
					<button type="submit" className="form-submit">Create</button>
				</Form>
			</Formik>
			<SearchSimilarResources name={name} resource='people' />
		</section>
	)
}

export default CreatePeopleForm