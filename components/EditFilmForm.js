import { useState, useEffect } from 'react'
import * as Yup from 'yup'
import { useRouter } from 'next/router'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { baseUrl, getOneItem, refreshPath } from '../utils/fetch'
import SearchSimilarResources from './SearchSimilarResources'
import useAuthContext from '../utils/useAuthContext'
import { auth } from '../utils/firebase-config'
import LoadingState from './LoadingState'

const EditFilmForm = ({ data }) => {
	const [name, setName] = useState('')
	const [openPopup, setOpenPopup] = useState(false)
	const [isError, setIsError] = useState(null)
	const [loading, setLoading] = useState(false)
	const [oldFilm, setOldFilm] = useState(null)
	const {currentUser, username} = useAuthContext()
	const router = useRouter()

	const openModal = () => {
		setOpenPopup(true)
		if(!currentUser){
			router.push('/users/signin')
		}
	}

	const fields = {
		name: data?.name ? data.name : '',
		trailerUrl: data?.trailerUrl ? data.trailerUrl : '',
		type: data?.type ? data.type : '',
		format: data?.format ? data.format : '',
		productionStage: data?.productionStage ? data.productionStage : '',
		runtime: data?.runtime ? data.runtime : '',
		logline: data?.logline ? data.logline : '',
		plotSummary: data?.plotSummary ? data.plotSummary : '',
		releaseDate: data?.releaseDate ? data.releaseDate : '',
		initialPlatform: data?.initialPlatform ? data.initialPlatform : '',
		genres: data?.genres ? data.genres : ''
	}

	return (
		<>
		<button onClick={openModal} className="button-awe" type="button">Edit</button>
		{
			openPopup &&
			<div className="form-popup">
			{
				!currentUser ?
				<LoadingState /> :
				<Formik
					initialValues={fields}
					validationSchema={Yup.object({
						name: Yup.string().max(60, 'Names are too long'),
						trailerUrl: Yup.string(),
						type: Yup.string().max(20, 'Invalid'),
						format: Yup.string().max(20, 'Invalid'),
						productionStage: Yup.string().max(20, 'Invalid'),
						runtime: Yup.number('Must be a number'),
						logline: Yup.string().max(150, 'Logline is too long'),
						plotSummary: Yup.string().max(500, 'Plot summary is too long'),
						releaseDate: Yup.date(),
						initialPlatform: Yup.string(),
						genres: Yup.array().min(1, 'Provide at least one genre').max(4, 'Only up to 4 genres allowed')
					})}
					onSubmit={async (values, { setErrors }) => {
						setLoading(true)
						try{
							const cleanValues = Object.fromEntries(Object.entries(values).filter(([_, value]) => value != ""))
							if(cleanValues.releaseDate){
								cleanValues.releaseDate = new Date(cleanValues.releaseDate)
							}
							
							const token = await currentUser.getIdToken(true)
							
							const requestConfig = {
								method: 'PATCH',
								headers: {
									AuthorizationToken: token,
									'Content-Type': 'application/json'
								},
								body: JSON.stringify(cleanValues)
							}

							const response = await fetch(`${baseUrl}/films/${data.id}`, requestConfig)
							const newFIlm = await response.json() 
							if(!response.ok){							
								throw new Error(newFIlm.message)
							}
							await refreshPath(router.asPath, token)
							router.replace(router.asPath)
							setLoading(false)
							setOpenPopup(false)
						} catch(err) {
							console.log(err)
							setLoading(false)
							setIsError(err.message)
						}
					}}
				>
					<Form
						className="form"
						onChange={(values) => {
							setIsError(null)
							if(values.target.name =='name'){
								setName(values.target.value)
							}
						}}
					>
						{loading && <LoadingState />}

						<div className="title-band">
							<h1 className="heading-one">Edit film</h1>
							<button disabled={loading ? true : false} onClick={() => setOpenPopup(false)} className="button-regular" type="button">Close</button>
						</div>
							
						{isError && <div className="error">{isError}</div>}

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
							<div className="headline-four">Genres</div>
							<div className="form-checkbox-label-container">
								<label className="form-checkbox-label">
									<Field name="genres" type="checkbox" value="sci-fi" />
									<span>Science Fiction</span>
								</label>
								<label className="form-checkbox-label">
									<Field name="genres" type="checkbox" value="romance" />
									<span>Romance</span>
								</label>
								<label className="form-checkbox-label">
									<Field name="genres" type="checkbox" value="action" />
									<span>Action</span>
								</label>
								<label className="form-checkbox-label">
									<Field name="genres" type="checkbox" value="comedy" />
									<span>Comedy</span>
								</label>
								<label className="form-checkbox-label">
									<Field name="genres" type="checkbox" value="drama" />
									<span>Drama</span>
								</label>
								<label className="form-checkbox-label">
									<Field name="genres" type="checkbox" value="fantasy" />
									<span>Fantasy</span>
								</label>
								<label className="form-checkbox-label">
									<Field name="genres" type="checkbox" value="biography" />
									<span>Biography</span>
								</label>
								<label className="form-checkbox-label">
									<Field name="genres" type="checkbox" value="thriller" />
									<span>Thriller</span>
								</label>
								<label className="form-checkbox-label">
									<Field name="genres" type="checkbox" value="historical" />
									<span>Historical</span>
								</label>
								<label className="form-checkbox-label">
									<Field name="genres" type="checkbox" value="musical" />
									<span>Musical</span>
								</label>
								<label className="form-checkbox-label">
									<Field name="genres" type="checkbox" value="mystery" />
									<span>Mystery</span>
								</label>
								<label className="form-checkbox-label">
									<Field name="genres" type="checkbox" value="adventure" />
									<span>Adventure</span>
								</label>
								<label className="form-checkbox-label">
									<Field name="genres" type="checkbox" value="satire" />
									<span>Satire</span>
								</label>
								<label className="form-checkbox-label">
									<Field name="genres" type="checkbox" value="western" />
									<span>Western</span>
								</label>
							</div>
							<div className="error">
								<ErrorMessage name="genres" />
							</div>
						</div>

						<button disabled={loading ? true : false} className="form-submit" type="submit">Submit</button>
					</Form>
				</Formik>
			}
			</div>
		}
		</>
	)
}

export default EditFilmForm