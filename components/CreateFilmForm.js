import { useState, useEffect } from 'react';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';

const CreateFilmForm = () => {
	const baseUrl = process.env.NEXT_PUBLIC_SERVER
	const [name, setName] = useState('')
	const [similarFilms, setSimilarFilms] = useState([])
	const [error, setError] = useState('')
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		async function getFilms(){
			try{
				setError('')
				const response = await fetch(`${baseUrl}/search/quick?film=${name}`)
				const data = await response.json()
				console.log(response, data)
				setLoading(true)
				if(data){
					setLoading(false)
					setSimilarFilms(data)
				}
			} catch(err) {
				setLoading(false)
				setError(err.message)
			}
		}

		getFilms()
	}, [name])

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
			handleChange={({value}) => {
				console.log(value['name'])
				setName(value['name'])
			}}
		>
			<div>
				<Form
					onChange={(values) => {
						if(values.target.name =='name'){
							setName(values.target.value)
						}
					}}
				>
					<h2>Add a new film</h2>

					<label htmlFor="name">Title</label>
					<Field name="name">
						{
							({field, form, meta}) => {
								return (
									<div>
										<input type="text" {...field} />
										{meta.touched && meta.error && <div>{meta.error}</div>}
									</div>
								)
							}
						}
					</Field>
					<ErrorMessage name="name" />

					<label htmlFor="trailerUrl">Trailer URL</label>
					<Field name="trailerUrl" type="text" />
					<ErrorMessage name="trailerUrl" />

					<label htmlFor="type">Type</label>
					<Field name="type" as="select" >
						<option value="">--Choose option--</option>
						<option value="fiction">Fiction</option>
						<option value="documentary">Documentary</option>
					</Field>
					<ErrorMessage name="type" />

					<label htmlFor="format">Format</label>
					<Field name="format" as="select" >
						<option value="">--Choose option--</option>
						<option value="feature">Feature film</option>
						<option value="short">Short film</option>
					</Field>
					<ErrorMessage name="format" />

					<label htmlFor="productionStage">Production Stage</label>
					<Field name="productionStage" as="select">
						<option value="">--Choose option--</option>
						<option value="development">Development</option>
						<option value="pre-production">Pre-production</option>
						<option value="production">Production</option>
						<option value="post-production">Post-production</option>
						<option value="finished">Finished</option>
					</Field>
					<ErrorMessage name="productionStage" />

					<label htmlFor= "runtime">Runtime</label>
					<Field name= "runtime" type="number" />
					<ErrorMessage name= "runtime" />

					<label htmlFor="logline">Logline</label>
					<Field name="logline" type="text" />
					<ErrorMessage name="logline" />

					<label htmlFor="plotSummary">Plot Summary</label>
					<Field name="plotSummary" as="textarea" />
					<ErrorMessage name="plotSummary" />

					<label htmlFor="releaseDate">Release Date</label>
					<Field name="releaseDate" type="date" />
					<ErrorMessage name="releaseDate" />

					<label htmlFor="initialPlatform">Initial Platform</label>
					<Field name="initialPlatform" type="text" />
					<ErrorMessage name="initialPlatform" />

					<label htmlFor="genres">Genres</label>
					<Field name="genres" type="text" />
					<ErrorMessage name="genres" />

					<button type="submit">Create</button>
				</Form>
				<section>
					{
						name.length > 0 ? 
						<h3>Checking if "{name}" already exist?</h3> : 
						<h3>Existing Title Checker</h3>
					}
					{error && <p>{error}</p>}
					{ loading && <p>Loading...</p> }
					{ similarFilms.length > 0 &&
						<ul>
							{
								similarFilms.map((film) => (<li key={film.name}>{film.name}</li>))
							}
						</ul>
					}
				</section>
			</div>
		</Formik>
	)
}

export default CreateFilmForm