import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import styles from '../styles/FilmDetails.module.css'
import EmptyPhoto from './EmptyPhoto'
import { auth } from '../utils/firebase-config'
import useAuthContext from '../utils/useAuthContext'
import LoadingState from './LoadingState'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { baseUrl } from '../utils/fetch'

const UploadPosterButton = ({type, id}) => {
	const [openPopup, setOpenPopup] = useState(false)
	const [errors, setErrors] = useState(null)
	const [loading, setLoading] = useState(false)
	const [image, setImage] = useState(null)
	const router = useRouter()
	const { currentUser } = useAuthContext()

	const openModal = () => {
		setOpenPopup(true)
		if(!currentUser){
			router.push('/users/signin')
		}
	}

	useEffect(() => {console.log(errors)}, [errors])

	return (
		<>
	 		<button onClick={() => {setOpenPopup(true)}} className="button-awe" type="button">Upload Poster</button>
	 		{
	 			openPopup &&
	 			<div className="form-popup">
	 				{
	 					!currentUser ?
	 					<LoadingState/> :
	 					<Formik
	 						initialValues={{poster: ''}}

	 						validationSchema={Yup.object({
								poster: Yup.mixed().required('Required')
							})}

	 						onSubmit={async (values) => {
	 							if(!image){
	 								throw new Error("Select an image")
	 							}
	 							setLoading(true)
	 							const formData = new FormData()
	 							formData.append('poster', image)
	 							console.log(values.poster)
	 							console.log(formData)
	 							try {
		 							const token = await currentUser.getIdToken(true)
							
									const requestConfig = {
										method: 'POST',
										headers: {
											AuthorizationToken: token
										},
										body: formData
									}

									const response = await fetch(`${baseUrl}/${type}/${id}/posters`, requestConfig)
									const data = await response.json()
									console.log(data)
									if(!response.ok){
										throw new Error(data.message)
									}

									router.reload()
								} catch(err) {
									setErrors(err.message)
									setLoading(false)
								}
	 						}}
	 					>
	 						<Form 
	 							className="form"

	 							onChange={(event) => {
	 								console.log(event.target.files[0])
	 								setImage(event.target.files[0])
									setErrors(null)
								}}
	 						>
	 							{loading && <LoadingState/>}

	 							<h2>Upload Poster</h2>
	 							{errors?.length && <p className="error">{errors}</p>}

	 							<div className="form-field">
									<label htmlFor= "poster">Select File</label>
									<Field className="textarea" name= "poster" type="file" />
									<div className="error">
										<ErrorMessage name="poster" />
									</div>
								</div>

								<div className="grouped-buttons">
									<button disabled={loading ? true : false} type="submit" className="button-good">Upload</button>
									<button disabled={loading ? true : false} onClick={() => {setOpenPopup(false)}} type="button" className="button-regular">Cancel</button>
								</div>
	 						</Form>
	 					</Formik>
	 				}					
				</div>
			}
	 	</>
	)
}

export default UploadPosterButton