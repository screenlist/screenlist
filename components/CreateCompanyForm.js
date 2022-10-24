import { useState, useEffect } from 'react'
import * as Yup from 'yup'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { baseUrl } from '../utils/fetch'
import SearchSimilarResources from './SearchSimilarResources'

const CreateCompanyForm = () => {

	const [name, setName] = useState('')

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
					try{
						const credentials = ""
					} catch(err) {
						setAuthError("Invalid email or password")
					}
				}}
			>
				<Form
					onChange={(values) => {
						if(values.target.name =='name'){
							setName(values.target.value)
						}
					}}
				>
					<h2>Add a new company</h2>

					<label htmlFor="name">Name</label>
					<Field name="name" type="text" />
					<ErrorMessage name="name" />

					<label htmlFor="description">Decription</label>
					<Field name="description" type="textarea" />
					<ErrorMessage name="description" />

					<label htmlFor="website">Website</label>
					<Field name="website" type="text" />
					<ErrorMessage name="website" />
				</Form>
			</Formik>
			<SearchSimilarResources name={name} resource='companies' />
		</section>
	)
}

export default CreateCompanyForm