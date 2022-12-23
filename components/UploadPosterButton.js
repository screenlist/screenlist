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
import UpdatePhotoInfo from './UpdatePhotoInfo'

const UploadPosterButton = ({type, id, posterObject, photo, imageIndex}) => {
	const [openPopup, setOpenPopup] = useState(false)
	const [errors, setErrors] = useState(null)
	const [loading, setLoading] = useState(false)
	const [image, setImage] = useState(null)
	const [uploadForm, setUploadForm] = useState(false)
	const router = useRouter()
	const { currentUser } = useAuthContext()

	const openModal = () => {
		setOpenPopup(true)
		document.querySelector('body').classList.add('no-scroll')
		if(!currentUser){
			router.push('/users/signin')
		}
	}

	const closeModal = () => {
		document.querySelector('body').classList.remove('no-scroll')
		setOpenPopup(false)
	}

	const deleteImage = async () => {
		setLoading(true)
		try{
			const token = await currentUser.getIdToken(true)

			const deleteResponse = await fetch(`${baseUrl}/${type}/${id}/${photo}?index=${posterObject.id}`, {
				method: 'DELETE',
				headers: {
					AuthorizationToken: token
				}
			})
			const deleteData = await deleteResponse.json()

			if(!deleteResponse.ok){
				throw new Error(deleteData.message)
			}

			await router.replace(router.asPath)
			setOpenPopup(false)
			setLoading(false)
		} catch(err) {
			setErrors(err.message)
			setLoading(false)
		}
	}

	return (
		<>
	 		<button onClick={openModal} className="button-edit" type="button">
	 			<Image 
	 				src='/edit-box-icon.svg'
	 				alt='edit icon'
					width={100}
					height={100}
	 			/>
	 		</button>
	 		{
	 			openPopup &&
	 			<div className="form-popup">
	 				{
	 					!currentUser ?
	 					<LoadingState/> :
	 					<Formik
	 						initialValues={{poster: '', attribution: '', description: ''}}

	 						validationSchema={Yup.object({
								poster: Yup.mixed().required('Required'),
								attribution: Yup.string().max(30, 'Too long').required('Required'),
								description: Yup.string().max(150, 'Too long').required('Required')
							})}

	 						onSubmit={async (values) => {
	 							if(!image){
	 								throw new Error("Select an image")
	 							}
	 							setLoading(true)
	 							const formData = new FormData()
	 							const photoType = photo == 'posters' ? 'poster' : 'still'
	 							formData.append(photoType, image)
	 							console.log(values.poster)
	 							console.log(formData)
	 							console.log(posterObject)

	 							try {
		 							const token = await currentUser.getIdToken(true)

		 							// If a new photo is replacing an existing one, delete the existing one before
									if(posterObject) {
										const deleteResponse = await fetch(`${baseUrl}/${type}/${id}/${photo}?index=${posterObject.id}`, {
											method: 'DELETE',
											headers: {
												AuthorizationToken: token
											}
										})
										const deleteData = await deleteResponse.json()

										if(!deleteResponse.ok){
											throw new Error(deleteData.message)
										}
									}
									
									const requestConfig = {
										method: 'POST',
										headers: {
											AuthorizationToken: token
										},
										body: formData
									}


									const infoConfig = {
										method: 'PATCH',
										headers: {
											AuthorizationToken: token,
											'Content-Type': 'application/json'
										},
										body: JSON.stringify({
											attribution: values.attribution,
											description: values.description
										})
									}

									const response = await fetch(`${baseUrl}/${type}/${id}/${photo}?index=${imageIndex}`, requestConfig)
									const data = await response.json()
									if(!response.ok){
										throw new Error(data.message)
									}

									// Update the newly created photos to add attribution and description
									const infoResponse = await fetch(`${baseUrl}/${type}/${id}/${photo}?index=${imageIndex}`, infoConfig)
									const infoData = await infoResponse.json()
									if(!infoResponse.ok){
										throw new Error(infoData.message)
									}

									router.reload() 
								} catch(err) {
									console.log(err)
									setErrors(err.message)
									setLoading(false)
								}
	 						}}
	 					>
	 					<div>
	 					{ 
	 						!uploadForm &&
	 						<div className="form">
	 							<div className="title-band">
	 								<button disabled={loading ? true : false} onClick={closeModal} type="button" className="button-icon">
	 									<Image 
											src="/close-icon.svg"
											alt="search icon"
											width={20}
											height={20}
										/>
	 								</button>
	 							</div>

	 							{loading && <LoadingState/>}
	 							{errors?.length && <p className="error">{errors}</p>}
	 							<br/>
	 							<h2>Photo Options</h2>
		 						<div className="grouped-buttons">
		 							<button disabled={loading ? true : false} onClick={()=>{setUploadForm(true)}} className="button-good" type="button">Upload</button>
		 							{ posterObject && !loading ? <UpdatePhotoInfo photo={photo} type={type} id={id} imageIndex={imageIndex} posterObject={posterObject}/> : null }
		 							{ posterObject && <button disabled={loading ? true : false} onClick={deleteImage} type="button" className="button-danger">Delete</button> }
		 						</div>
	 						</div>
	 					}
	 					{
	 						uploadForm &&
	 						<Form 
	 							className="form"

	 							onChange={(event) => {
	 								if(event.target.name === 'poster'){
	 									setImage(event.target.files[0])
	 								}
									setErrors(null)
								}}
	 						>	 							
	 							{loading && <LoadingState/>}

	 							<h2>Upload {photo == 'posters' ? 'Poster' : 'Still'}</h2>
	 							
	 							{errors?.length && <p className="error">{errors}</p>}

	 							<div className="form-field">
									<label htmlFor= "poster">Select File</label>
									<Field className="textarea" name= "poster" type="file" />
									<div className="error">
										<ErrorMessage name="poster" />
									</div>
								</div>

								<div className="form-field">
									<label htmlFor= "attribution">Copyright Owner</label>
									<Field name= "attribution" type="text" />
									<div className="error">
										<ErrorMessage name="attribution" />
									</div>
								</div>

								<div className="form-field">
									<label htmlFor= "description">Describe Contents of the Picture</label>
									<Field name= "description" type="text" />
									<div className="error">
										<ErrorMessage name="description" />
									</div>
								</div>

								<div className="grouped-buttons">
									<button disabled={loading ? true : false} type="submit" className="button-good">Upload</button>
									<button disabled={loading ? true : false} onClick={() => {setUploadForm(false)}} type="button" className="button-regular">Cancel</button>
								</div>
	 						</Form>
	 					}
	 					</div>
	 					</Formik>
	 				}					
				</div>
			}
	 	</>
	)
}

export default UploadPosterButton