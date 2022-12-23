import { useState, useEffect } from 'react'
import * as Yup from 'yup'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { baseUrl } from '../utils/fetch'
import SearchSimilarResources from './SearchSimilarResources'

const CreateCompanyForm = ({setterFunction, nested}) => {

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
					className="form"
					onChange={(values) => {
						if(values.target.name =='name'){
							setName(values.target.value)
						}
					}}
				>
					<h2>Add a new company</h2>

					<div className="form-field">
						<label htmlFor="name">Name</label>
						<Field name="name" type="text" />
						<div className="error">
							<ErrorMessage name="name" />
						</div>
					</div>

					<div className="form-field">
						<label htmlFor="description">Decription</label>
						<Field name="description" type="textarea" />
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

					<button className="form-submit" type="submit">Create</button>
				</Form>
			</Formik>
			<SearchSimilarResources name={name} resource='companies' />
		</section>
	)
}

export default CreateCompanyForm