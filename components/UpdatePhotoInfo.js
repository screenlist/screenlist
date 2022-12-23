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

const UpdatePhotoInfo = ({type, id, posterObject, photo, imageIndex}) => {
	const [openPopup, setOpenPopup] = useState(false)
	const [errors, setErrors] = useState(null)
	const [loading, setLoading] = useState(false)
	const router = useRouter()
	const { currentUser } = useAuthContext()

	const openModal = () => {
		setOpenPopup(true)
		if(!currentUser){
			router.push('/users/signin')
		}
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
	 		<button onClick={openModal} className="button-regular" type="button">
	 			Update
	 		</button>
	 		{
	 			openPopup &&
	 			<div className="form-popup">
	 				{
	 					!currentUser ?
	 					<LoadingState/> :
	 					<Formik
	 						initialValues={{
	 							attribution: posterObject.credit ? posterObject.credit : '', 
	 							description: posterObject.altText ? posterObject.altText : ''
	 						}}

	 						validationSchema={Yup.object({
								attribution: Yup.string().max(30, 'Too long').required('Required'),
								description: Yup.string().max(150, 'Too long').required('Required')
							})}

	 						onSubmit={async (values) => {
	 							
	 							setLoading(true)
	 							const photoType = photo == 'posters' ? 'poster' : 'still'
	 							console.log(posterObject)

	 							try {
		 							const token = await currentUser.getIdToken(true)

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
	 						<Form 
	 							className="form"

	 							onChange={(event) => {
									setErrors(null)
								}}
	 						>
	 							{loading && <LoadingState/>}
	 							<h2>Edit Information</h2>
	 							{errors?.length && <p className="error">{errors}</p>}

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
									<button disabled={loading ? true : false} type="submit" className="button-good">Submit</button>
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

export default UpdatePhotoInfo