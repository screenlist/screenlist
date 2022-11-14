import { useState, useEffect } from 'react'
import * as Yup from 'yup'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { baseUrl } from '../utils/fetch'
import SearchSimilarResources from './SearchSimilarResources'

const CreateFilmForm = () => {
	const [name, setName] = useState('')

	const fields = {
		name: '',
		trailerUrl: '',
		type: '',
		format: '',
		productionStage: '',
		runtime: '',
		logline: '',
		plotSummary: '',
		releaseDate: '',
		initialPlatform: '',
		genres: ''
	}

	return (
		<section className="form-with-bar">
			<Formik
				initialValues={fields}
				validationSchema={Yup.object({
					name: Yup.string().max(60, 'Names are too long').required('Required'),
					trailerUrl: Yup.string(),
					type: Yup.string().max(20, 'Invalid').required('Required'),
					format: Yup.string().max(20, 'Invalid').required('Required'),
					productionStage: Yup.string().max(20, 'Invalid').required('Required'),
					runtime: Yup.number('Must be a number'),
					logline: Yup.string().max(150, 'Logline is too long').required('Required'),
					plotSummary: Yup.string().max(500, 'Plot summary is too long'),
					releaseDate: Yup.string().length(10, 'Invalid date'),
					initialPlatform: Yup.string(),
					genres: Yup.array().required('Required')
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
					<h1 className="heading-one">Add a new film</h1>
					
					<div className="form-field" >					
						<label htmlFor="name">Title</label>
						<Field name="name" type="text" />
						<div className="error">
							<ErrorMessage name="name" />
						</div>
					</div>
					
					<div className="form-field" >
						<label htmlFor="trailerUrl">Trailer URL</label>
						<Field name="trailerUrl" type="text" />
						<div className="error">
							<ErrorMessage name="trailerUrl" />
						</div>
					</div>

					<div className="form-field" >
						<label htmlFor="type">Type</label>
						<Field name="type" as="select" >
							<option value="">--Choose option--</option>
							<option value="fiction">Fiction</option>
							<option value="documentary">Documentary</option>
						</Field>
						<div className="error">
							<ErrorMessage name="type" />
						</div>
					</div>

					<div className="form-field" >
						<label htmlFor="format">Format</label>
						<Field name="format" as="select" >
							<option value="">--Choose option--</option>
							<option value="feature">Feature film</option>
							<option value="short">Short film</option>
						</Field>
						<div className="error">
							<ErrorMessage name="format" />
						</div>
					</div>

					<div className="form-field" >
						<label htmlFor="productionStage">Production Stage</label>
						<Field name="productionStage" as="select">
							<option value="">--Choose option--</option>
							<option value="development">Development</option>
							<option value="pre-production">Pre-production</option>
							<option value="production">Production</option>
							<option value="post-production">Post-production</option>
							<option value="finished">Finished</option>
						</Field>
						<div className="error">
							<ErrorMessage name="productionStage" />
						</div>
					</div>

					<div className="form-field" >
						<label htmlFor= "runtime">Runtime</label>
						<Field name= "runtime" type="number" />
						<div className="error">
							<ErrorMessage name="runtime" />
						</div>
					</div>

					<div className="form-field" >
						<label htmlFor="logline">Logline</label>
						<Field name="logline" type="text" />
						<div className="error">
							<ErrorMessage name="logline" />
						</div>
					</div>

					<div className="form-field" >
						<label htmlFor="plotSummary">Plot Summary</label>
						<Field name="plotSummary" as="textarea" />
						<div className="error">
							<ErrorMessage name="plotSummary" />
						</div>
					</div>

					<div className="form-field" >
						<label htmlFor="releaseDate">Release Date</label>
						<Field name="releaseDate" type="date" />
						<div className="error">
							<ErrorMessage name="releaseDate" />
						</div>
					</div>

					<div className="form-field" >
						<label htmlFor="initialPlatform">Initial Platform</label>
						<Field name="initialPlatform" type="text" />
						<div className="error">
							<ErrorMessage name="initialPlatform" />
						</div>
					</div>

					<div className="form-field" >
						<label htmlFor="genres">Genres</label>
						<Field name="genres" type="text" />
						<div className="error">
							<ErrorMessage name="genres" />
						</div>
					</div>

					<button className="form-submit" type="submit">Create</button>
				</Form>
			</Formik>
			<SearchSimilarResources className='form-bar' name={name} resource='films' />
		</section>
	)
}

export default CreateFilmForm