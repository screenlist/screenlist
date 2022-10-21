import { useState } from 'react';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';

const CreateSeriesForm = () => {
	const fields = {
		name: '',
		trailerUrl: '',
		type: '',
		seasons: '',
		episodes: '',
		productionStage: '',
		episodeRuntime: '',
		logline: '',
		plotSummary: '',
		releaseDate: '',
		finalEpisodeDate: '',
		originalPlatform: '',
		genres: ''
	}

	return (
		<Formik
			initialValues={fields}
			validationSchema={Yup.object({
				name: Yup.string().max(60, 'Names are too long').required('Required'),
				trailerUrl: Yup.string(),
				type: Yup.string().max(20, 'Invalid').required('Required'),
				seasons: Yup.number().min(1, 'Must have a minimum of 1 season').required('Required'),
				episodes: Yup.number(),
				productionStage: Yup.string().max(20, 'Invalid').required('Required'),
				episodeRuntime: Yup.number('Must be a number'),
				logline: Yup.string().max(150, 'Logline is too long').required('Required'),
				plotSummary: Yup.string().max(500, 'Plot summary is too long'),
				releaseDate: Yup.string().length(10, 'Invalid date'),
				finalEpisodeDate: Yup.string().length(10, 'Invalid date'),
				originalPlatform: Yup.string(),
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
			<Form>
				<label htmlFor="name">Title</label>
				<Field name="name" type="text" />
				<ErrorMessage name="name" />

				<label htmlFor="productionStage">Production Stage</label>
				<Field name="productionStage" type="text" />
				<ErrorMessage name="productionStage" />

				<label htmlFor="trailerUrl">Trailer URL</label>
				<Field name="trailerUrl" type="text" />
				<ErrorMessage name="trailerUrl" />

				<label htmlFor="type">Type</label>
				<Field name="type" type="text" />
				<ErrorMessage name="type" />

				<label htmlFor="seasons">Seasons</label>
				<Field name="seasons" type="number" />
				<ErrorMessage name="seasons" />

				

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

				<label htmlFor="finalEpisodeDate">Final Episode Date</label>
				<Field name="finalEpisodeDate" type="date" />
				<ErrorMessage name="finalEpisodeDate" />

				<label htmlFor="originalPlatform">Original Platform</label>
				<Field name="originalPlatform" type="text" />
				<ErrorMessage name="originalPlatform" />

				<label htmlFor="genres">Genres</label>
				<Field name="genres" type="text" />
				<ErrorMessage name="genres" />

				<button type="submit">Create</button>
			</Form>
		</Formik>
	)
}

export default CreateSeriesForm