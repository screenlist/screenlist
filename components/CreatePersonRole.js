import { useState, useEffect } from 'react'
import * as Yup from 'yup'
import { useRouter } from 'next/router'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { baseUrl, getOneItem, refreshPath } from '../utils/fetch'
import SearchSimilarResources from './SearchSimilarResources'
import useAuthContext from '../utils/useAuthContext'
import { auth } from '../utils/firebase-config'
import LoadingState from './LoadingState'
import CreatePersonForm from './CreatePersonForm'
import SearchWidget from './SearchWidget'

const CreatePersonRole = ({ id, kind, category }) => {
	const [openPopup, setOpenPopup] = useState(false)
	const [isError, setIsError] = useState(null)
	const [loading, setLoading] = useState(false)
	const {currentUser, username} = useAuthContext()
	const router = useRouter()

	

	// progress triggers
	const [personData, setPersonData] = useState(null)
	const [departmentState, setDepartmentState] = useState(null)
	const [addPerson, setAddPerson] = useState(false)

	

	const openModal = () => {
		setOpenPopup(true)
		document.querySelector('body').classList.add('no-scroll')
		if(!currentUser){
			router.push('/users/signin')
		}
	}

	const closeModal = () => {
		setOpenPopup(false)
		document.querySelector('body').classList.remove('no-scroll')
	}
	useEffect(() => {
		console.log(personData)
	}, [personData])

	const fields = {
		personName: '',
		category: category,
		title: category == 'cast' ? 'actor' : '',
		department: '',
		characterName: '',
		characterDescription: ''
	}

	return (
		<>
		<button onClick={openModal} className="button-awe" type="button">Add</button>
		{
			openPopup &&
			<div className="form-popup">
			{
				!currentUser ?
				<LoadingState /> :
				<Formik
					initialValues={fields}
					validationSchema={Yup.object({
						personName: Yup.string().max(60, "Person's name is too long").required('Required'),
						category: Yup.string().max(20, 'Too long').required('Required'),
						title: Yup.string().max(30, 'Too long'),
						department: Yup.string().max(20, 'Too long'),
						characterName: Yup.string(60, 'Too long'),
						characterDescription: Yup.string().max(150, 'Too long')
					})}
					onSubmit={async (values, { setErrors }) => {
						setLoading(true)
						
						try{

							if(values.category == 'cast'){
								if(values.department.length < 1 || values.characterName.length < 1){
									throw new Error('Department and Character Name are required')
								}

								if(values.department == 'main cast' && values.characterDescription.length < 1){
									throw new Error('Description is required for main roles')
								}
							}
							if(values.category == 'crew'){
								if(values.title.length < 1 || values.department.length < 1){
									throw new Error('Both Department and Title are required')
								}
							}

							const cleanValues = Object.fromEntries(Object.entries(values).filter(([_, value]) => value != ""))
							console.log(cleanValues)
							const token = await currentUser.getIdToken(true)
							
							const requestConfig = {
								method: 'POST',
								headers: {
									AuthorizationToken: token,
									'Content-Type': 'application/json'
								},
								body: JSON.stringify(cleanValues)
							}

							const personId = personData.objectID ? personData.objectID : personData.id

							const response = await fetch(`${baseUrl}/films/${id}/people/${personId}/roles`, requestConfig)
							const newRole = await response.json() 
							if(!response.ok){							
								throw new Error(newRole.message)
							}
							await refreshPath(router.asPath, token)
							router.replace(router.asPath)
							setLoading(false)
							closeModal()
							setPersonData(null)
						} catch(err) {
							setLoading(false)
							setIsError(err.message)
						}
					}}
				>
					<div>
					{	!personData &&
						<div>
							<div className="title-band">
								<h1>Search Person</h1>
								<button disabled={loading ? true : false} onClick={closeModal} className="button-regular" type="button">Cancel</button>
							</div>
							<SearchWidget setterFunction={setPersonData} index='people' field='personName' />
							<hr/>
							<button type="button" className="button-regular" onClick={() => setAddPerson(!addPerson)}>{addPerson ? 'Close' : 'Add New Person'}</button>
							<hr/>
							{
								!personData && addPerson ?
								<CreatePersonForm setterFunction={setPersonData} nested={true} field='personName' /> :
								null
							}
						</div>
					}

					{ personData &&
					<Form
						className="form"
						onChange={(values) => {
							setIsError(null)
							if(values.target.name =='department'){
								setDepartmentState(values.target.value)
							}
						}}
					>
						{loading && <LoadingState />}

						<div className="title-band">
							<h1 className="heading-one">Add Role</h1>
							<div className="grouped-buttons">
							<button disabled={loading ? true : false} onClick={() => setPersonData(null)} className="button-awe">Reset</button>
							<button disabled={loading ? true : false} onClick={closeModal} className="button-regular" type="button">Close</button>
							</div>
						</div>
							
						{isError && <div className="danger">{isError}</div>}	

						<div className="form-field">					
							<label htmlFor="personName">Name</label>
							<Field name="personName" type="text" disabled={true} />
							<div className="error">
								<ErrorMessage name="personName" />
							</div>
						</div>	

						<div className="form-field">					
							<label htmlFor="category">Category</label>
							<Field name="category" type="text" disabled={true} />
							<div className="error">
								<ErrorMessage name="category" />
							</div>
						</div>	

						{
							category == 'cast' && 
							<div className="form-field">					
								<label htmlFor="title">Title</label>
								<Field name="title" type="text" disabled={true} />
								<div className="error">
									<ErrorMessage name="title" />
								</div>
							</div>
						}			

						<div className="form-field" >
							<div className="headline-four">Department</div>
							<div className="form-checkbox-label-container">
							{	category == 'cast' &&
								<>
									<label className="form-checkbox-label">
										<Field name="department" type="radio" value="main cast" />
										<span>Main cast</span>
									</label>
									<label className="form-checkbox-label">
										<Field name="department" type="radio" value="additional cast" />
										<span>Additional Cast</span>
									</label>
								</>
							}
							{ category == 'crew' &&
								<>
									<label className="form-checkbox-label">
										<Field name="department" type="radio" value="above line" />
										<span>Above The Line (Main) Crew</span>
									</label>
									<label className="form-checkbox-label">
										<Field name="department" type="radio" value="production" />
										<span>Production</span>
									</label>
									<label className="form-checkbox-label">
										<Field name="department" type="radio" value="assistant directors" />
										<span>Assistant Directors</span>
									</label>
									<label className="form-checkbox-label">
										<Field name="department" type="radio" value="locations" />
										<span>Locations</span>
									</label>
									<label className="form-checkbox-label">
										<Field name="department" type="radio" value="transportation" />
										<span>Transportation</span>
									</label>
									<label className="form-checkbox-label">
										<Field name="department" type="radio" value="sound" />
										<span>Sound</span>
									</label>
									<label className="form-checkbox-label">
										<Field name="department" type="radio" value="continuity" />
										<span>Continuity</span>
									</label>
									<label className="form-checkbox-label">
										<Field name="department" type="radio" value="camera" />
										<span>Camera</span>
									</label>
									<label className="form-checkbox-label">
										<Field name="department" type="radio" value="grip" />
										<span>Grip</span>
									</label>
									<label className="form-checkbox-label">
										<Field name="department" type="radio" value="electrical" />
										<span>Electrical</span>
									</label>
									<label className="form-checkbox-label">
										<Field name="department" type="radio" value="art" />
										<span>Art</span>
									</label>
									<label className="form-checkbox-label">
										<Field name="department" type="radio" value="props" />
										<span>Props</span>
									</label>
									<label className="form-checkbox-label">
										<Field name="department" type="radio" value="costume and wardrobe" />
										<span>Costume and Wardrobe</span>
									</label>
									<label className="form-checkbox-label">
										<Field name="department" type="radio" value="hair and makeup" />
										<span>Hair and Makeup</span>
									</label>
									<label className="form-checkbox-label">
										<Field name="department" type="radio" value="stunts" />
										<span>Stunts</span>
									</label>
									<label className="form-checkbox-label">
										<Field name="department" type="radio" value="visual effects" />
										<span>Visual Effects</span>
									</label>
									<label className="form-checkbox-label">
										<Field name="department" type="radio" value="special effects" />
										<span>Special Effects</span>
									</label>
									<label className="form-checkbox-label">
										<Field name="department" type="radio" value="catering" />
										<span>Catering and Food</span>
									</label>
									<label className="form-checkbox-label">
										<Field name="department" type="radio" value="safety" />
										<span>Safety</span>
									</label>
									<label className="form-checkbox-label">
										<Field name="department" type="radio" value="post production" />
										<span>Post Production</span>
									</label>
								</>
							}
							</div>
							<div className="error">
								<ErrorMessage name="department" />
							</div>
						</div>

						{
							category == 'cast' &&
							<>
								<div className="form-field" >
									<label htmlFor="characterName">Character Name</label>
									<Field name="characterName" type="text" />
									<div className="error">
										<ErrorMessage name="characterName" />
									</div>
								</div>

								{
									departmentState == 'main cast' &&
									<div className="form-field" >
										<label htmlFor="characterDescription">Character Description</label>
										<Field name="characterDescription" as="textarea" />
										<div className="error">
											<ErrorMessage name="characterDescription" />
										</div>
									</div>
								}
							</>
						}

						<div className="form-field" >
							{category != 'cast' && <div className="headline-four">Title</div>}
							<div className="form-checkbox-label-container">
							{!departmentState && <p className="">Select a department first</p>}

							{	
								departmentState == 'above line' &&
								<>
									<label className="form-checkbox-label">
										<Field name="title" type="radio" value="director" />
										<span>Director</span>
									</label>
									<label className="form-checkbox-label">
										<Field name="title" type="radio" value="writer" />
										<span>Writer</span>
									</label>
									<label className="form-checkbox-label">
										<Field name="title" type="radio" value="producer" />
										<span>Producer</span>
									</label>
									<label className="form-checkbox-label">
										<Field name="title" type="radio" value="executive producer" />
										<span>Executive Producer</span>
									</label>
									<label className="form-checkbox-label">
										<Field name="title" type="radio" value="associate producer" />
										<span>Associate Producer</span>
									</label>
								</>
							}

							{
								departmentState == 'production' &&
								<>
									<label className="form-checkbox-label">
										<Field name="title" type="radio" value="line producer" />
										<span>Line Producer</span>
									</label>
									<label className="form-checkbox-label">
										<Field name="title" type="radio" value="unit production manager" />
										<span>Unit Production Manager</span>
									</label>
									<label className="form-checkbox-label">
										<Field name="title" type="radio" value="production coordinator" />
										<span>Production Coordinator</span>
									</label>
									<label className="form-checkbox-label">
										<Field name="title" type="radio" value="assistant production coordinator" />
										<span>Assistant Production Coordinator</span>
									</label>
									<label className="form-checkbox-label">
										<Field name="title" type="radio" value="set accountant" />
										<span>Set Accountant</span>
									</label>
									<label className="form-checkbox-label">
										<Field name="title" type="radio" value="office production assistant" />
										<span>Office Production Assistant</span>
									</label>
								</>
							}

							{
								departmentState == 'assistant directors' &&
								<>
									<label className="form-checkbox-label">
										<Field name="title" type="radio" value="first AD" />
										<span>First AD</span>
									</label>
									<label className="form-checkbox-label">
										<Field name="title" type="radio" value="second AD" />
										<span>Second AD</span>
									</label>
									<label className="form-checkbox-label">
										<Field name="title" type="radio" value="third AD" />
										<span>Third AD</span>
									</label>
									<label className="form-checkbox-label">
										<Field name="title" type="radio" value="key production assistant" />
										<span>Key Production Assistant</span>
									</label>
									<label className="form-checkbox-label">
										<Field name="title" type="radio" value="production assistant" />
										<span>Production Assistant</span>
									</label>
								</>
							}

							{
								departmentState == 'locations' &&
								<>
									<label className="form-checkbox-label">
										<Field name="title" type="radio" value="location manager" />
										<span>Location Manager</span>
									</label>
									<label className="form-checkbox-label">
										<Field name="title" type="radio" value="location scout" />
										<span>Location Scout</span>
									</label>
								</>
							}

							{
								departmentState == 'transportation' &&
								<>
									<label className="form-checkbox-label">
										<Field name="title" type="radio" value="transportation captain" />
										<span>Transportation Captain</span>
									</label>
									<label className="form-checkbox-label">
										<Field name="title" type="radio" value="transportation coordinator" />
										<span>Transportation Coordinator</span>
									</label>
									<label className="form-checkbox-label">
										<Field name="title" type="radio" value="driver" />
										<span>Driver</span>
									</label>
								</>
							}

							{
								departmentState == 'sound' &&
								<>
									<label className="form-checkbox-label">
										<Field name="title" type="radio" value="production sound mixer" />
										<span>Production Sound Mixer</span>
									</label>
									<label className="form-checkbox-label">
										<Field name="title" type="radio" value="boom operator" />
										<span>Boom Operator</span>
									</label>
									<label className="form-checkbox-label">
										<Field name="title" type="radio" value="sound assistant" />
										<span>Sound Assistant</span>
									</label>
								</>
							}

							{
								departmentState == 'continuity' &&
								<>
									<label className="form-checkbox-label">
										<Field name="title" type="radio" value="script supervisor" />
										<span>Script Supervisor</span>
									</label>
								</>
							}

							{
								departmentState == 'camera' &&
								<>
									<label className="form-checkbox-label">
										<Field name="title" type="radio" value="cinematographer" />
										<span>Cinematographer</span>
									</label>
									<label className="form-checkbox-label">
										<Field name="title" type="radio" value="camera operator" />
										<span>Camera Operator</span>
									</label>
									<label className="form-checkbox-label">
										<Field name="title" type="radio" value="first AC" />
										<span>First Camera Assistant</span>
									</label>
									<label className="form-checkbox-label">
										<Field name="title" type="radio" value="second AC" />
										<span>Second Camera Assistant</span>
									</label>
									<label className="form-checkbox-label">
										<Field name="title" type="radio" value="steadicam operator" />
										<span>Steadicam Operator</span>
									</label>
									<label className="form-checkbox-label">
										<Field name="title" type="radio" value="drone operator" />
										<span>Drone Operator</span>
									</label>
									<label className="form-checkbox-label">
										<Field name="title" type="radio" value="digital imaging technicial" />
										<span>Digital Imaging Technician</span>
									</label>
									<label className="form-checkbox-label">
										<Field name="title" type="radio" value="still photographer" />
										<span>Still Photographer</span>
									</label>
								</>
							}

							{
								departmentState == 'grip' &&
								<>
									<label className="form-checkbox-label">
										<Field name="title" type="radio" value="key grip" />
										<span>Key Grip</span>
									</label>
									<label className="form-checkbox-label">
										<Field name="title" type="radio" value="first assistant grip" />
										<span>First Assistant Grip</span>
									</label>
									<label className="form-checkbox-label">
										<Field name="title" type="radio" value="dolly grip" />
										<span>Dolly Grip</span>
									</label>
									<label className="form-checkbox-label">
										<Field name="title" type="radio" value="rigging grip" />
										<span>Rigging Grip</span>
									</label>
								</>
							}

							{
								departmentState == 'electrical' &&
								<>
									<label className="form-checkbox-label">
										<Field name="title" type="radio" value="gaffer" />
										<span>Gaffer</span>
									</label>
									<label className="form-checkbox-label">
										<Field name="title" type="radio" value="first assistant gaffer" />
										<span>First Assistant Gaffer</span>
									</label>
									<label className="form-checkbox-label">
										<Field name="title" type="radio" value="rigging electrician" />
										<span>Rigging Electrician</span>
									</label>
									<label className="form-checkbox-label">
										<Field name="title" type="radio" value="set electrician" />
										<span>Set Electrician</span>
									</label>
									<label className="form-checkbox-label">
										<Field name="title" type="radio" value="shop electrician" />
										<span>Shop Electrician</span>
									</label>
									<label className="form-checkbox-label">
										<Field name="title" type="radio" value="basecamp electrician" />
										<span>Basecamp Electrician</span>
									</label>
									<label className="form-checkbox-label">
										<Field name="title" type="radio" value="generator operator" />
										<span>Generator Operator</span>
									</label>
								</>
							}

							{
								departmentState == 'art' &&
								<>
									<label className="form-checkbox-label">
										<Field name="title" type="radio" value="production designer" />
										<span>Production Designer</span>
									</label>
									<label className="form-checkbox-label">
										<Field name="title" type="radio" value="art director" />
										<span>Art Director</span>
									</label>
									<label className="form-checkbox-label">
										<Field name="title" type="radio" value="art department coordinator" />
										<span>Art Department Coordinator</span>
									</label>
									<label className="form-checkbox-label">
										<Field name="title" type="radio" value="construction coordinator" />
										<span>Construction Coordinator</span>
									</label>
									<label className="form-checkbox-label">
										<Field name="title" type="radio" value="carpenter" />
										<span>Carpenter</span>
									</label>
									<label className="form-checkbox-label">
										<Field name="title" type="radio" value="key scenic" />
										<span>Key Scenic</span>
									</label>
									<label className="form-checkbox-label">
										<Field name="title" type="radio" value="scenic artist" />
										<span>Scenic Artist</span>
									</label>
									<label className="form-checkbox-label">
										<Field name="title" type="radio" value="set decorator" />
										<span>Set Decorator</span>
									</label>
									<label className="form-checkbox-label">
										<Field name="title" type="radio" value="leadperson" />
										<span>Leadperson</span>
									</label>
									<label className="form-checkbox-label">
										<Field name="title" type="radio" value="set dresser" />
										<span>Set Dresser</span>
									</label>
									<label className="form-checkbox-label">
										<Field name="title" type="radio" value="greenskeeper" />
										<span>Greenskeeper</span>
									</label>
									<label className="form-checkbox-label">
										<Field name="title" type="radio" value="art department production assistant" />
										<span>Art Department Production Assistant</span>
									</label>
								</>
							}

							{
								departmentState == 'props' &&
								<>
									<label className="form-checkbox-label">
										<Field name="title" type="radio" value="property master" />
										<span>Property Master</span>
									</label>
									<label className="form-checkbox-label">
										<Field name="title" type="radio" value="assistant property master" />
										<span>Assistant Property Master</span>
									</label>
									<label className="form-checkbox-label">
										<Field name="title" type="radio" value="property maker" />
										<span>Property Maker</span>
									</label>
									<label className="form-checkbox-label">
										<Field name="title" type="radio" value="property assistant" />
										<span>Property Assistant</span>
									</label>
									<label className="form-checkbox-label">
										<Field name="title" type="radio" value="food stylist" />
										<span>Food Stylist</span>
									</label>
									<label className="form-checkbox-label">
										<Field name="title" type="radio" value="animal wrangler" />
										<span>Animal Wrangler</span>
									</label>
								</>
							}

							{
								departmentState == 'costume and wardrobe' &&
								<>
									<label className="form-checkbox-label">
										<Field name="title" type="radio" value="costume designer" />
										<span>Costume Designer</span>
									</label>
									<label className="form-checkbox-label">
										<Field name="title" type="radio" value="assistant costume designer" />
										<span>Assistant Costume Designer</span>
									</label>
									<label className="form-checkbox-label">
										<Field name="title" type="radio" value="key costumer" />
										<span>Key Costumer</span>
									</label>
									<label className="form-checkbox-label">
										<Field name="title" type="radio" value="set costumer" />
										<span>Set Costumer</span>
									</label>
									<label className="form-checkbox-label">
										<Field name="title" type="radio" value="wardrobe supervisor" />
										<span>Wardrobe Supervisor</span>
									</label>
									<label className="form-checkbox-label">
										<Field name="title" type="radio" value="ager-dryer" />
										<span>Ager/Dryer</span>
									</label>
									<label className="form-checkbox-label">
										<Field name="title" type="radio" value="seamstress" />
										<span>Seamstress</span>
									</label>
									<label className="form-checkbox-label">
										<Field name="title" type="radio" value="shopper" />
										<span>Shopper</span>
									</label>
								</>
							}

							{
								departmentState == 'hair and makeup' &&
								<>
									<label className="form-checkbox-label">
										<Field name="title" type="radio" value="hair department head" />
										<span>Hair Department Head</span>
									</label>
									<label className="form-checkbox-label">
										<Field name="title" type="radio" value="makeup department head" />
										<span>Makeup Department Head</span>
									</label>
									<label className="form-checkbox-label">
										<Field name="title" type="radio" value="makeup artist" />
										<span>Makeup Artist</span>
									</label>
									<label className="form-checkbox-label">
										<Field name="title" type="radio" value="makeup effects artist" />
										<span>Makeup Effects Artist</span>
									</label>
									<label className="form-checkbox-label">
										<Field name="title" type="radio" value="Hair Stylist" />
										<span>Hair Stylist</span>
									</label>
								</>
							}

							{
								departmentState == 'stunts' &&
								<>
									<label className="form-checkbox-label">
										<Field name="title" type="radio" value="stunt coordinator" />
										<span>Stunt Coordinator</span>
									</label>
									<label className="form-checkbox-label">
										<Field name="title" type="radio" value="stunt performer" />
										<span>Stunt Performer</span>
									</label>
									<label className="form-checkbox-label">
										<Field name="title" type="radio" value="stunt rigger" />
										<span>Stunt Rigger</span>
									</label>
								</>
							}

							{
								departmentState == 'visual effects' &&
								<>
									<label className="form-checkbox-label">
										<Field name="title" type="radio" value="visual effects supervisor" />
										<span>Visual Effects Supervisor</span>
									</label>
									<label className="form-checkbox-label">
										<Field name="title" type="radio" value="visual effects coordinator" />
										<span>Visual Effects Coordinator</span>
									</label>
								</>
							}

							{
								departmentState == 'special effects' &&
								<>
									<label className="form-checkbox-label">
										<Field name="title" type="radio" value="special effects coordinator" />
										<span>Special Effects Coordinator</span>
									</label>
									<label className="form-checkbox-label">
										<Field name="title" type="radio" value="special effects foreman" />
										<span>Special Effects Foreman</span>
									</label>
									<label className="form-checkbox-label">
										<Field name="title" type="radio" value="special effects Technician" />
										<span>Special Effects Technician</span>
									</label>
									<label className="form-checkbox-label">
										<Field name="title" type="radio" value="armourer" />
										<span>Armourer</span>
									</label>
									<label className="form-checkbox-label">
										<Field name="title" type="radio" value="pyrotechnician" />
										<span>Pyrotechnician</span>
									</label>
								</>
							}

							{
								departmentState == 'catering' &&
								<>
									<label className="form-checkbox-label">
										<Field name="title" type="radio" value="production caterer" />
										<span>Production Caterer</span>
									</label>
									<label className="form-checkbox-label">
										<Field name="title" type="radio" value="key craft service" />
										<span>Key Craft Service</span>
									</label>
								</>
							}

							{
								departmentState == 'safety' &&
								<>
									<label className="form-checkbox-label">
										<Field name="title" type="radio" value="set medic" />
										<span>Set Medic</span>
									</label>
									<label className="form-checkbox-label">
										<Field name="title" type="radio" value="intimacy coordinator" />
										<span>Intimacy Coordinator</span>
									</label>
									<label className="form-checkbox-label">
										<Field name="title" type="radio" value="covid compliance officer" />
										<span>Covid Compliance Officer</span>
									</label>
									<label className="form-checkbox-label">
										<Field name="title" type="radio" value="writer" />
										<span>Writer</span>
									</label>
									<label className="form-checkbox-label">
										<Field name="title" type="radio" value="writer" />
										<span>Writer</span>
									</label>
								</>
							}

							{
								departmentState == 'post production' &&
								<>
									<label className="form-checkbox-label">
										<Field name="title" type="radio" value="post production coordinator" />
										<span>Post Production Coordinator</span>
									</label>
									<label className="form-checkbox-label">
										<Field name="title" type="radio" value="sound designer" />
										<span>Sound Designer</span>
									</label>
									<label className="form-checkbox-label">
										<Field name="title" type="radio" value="sound editor" />
										<span>Sound Editor</span>
									</label>
									<label className="form-checkbox-label">
										<Field name="title" type="radio" value="foley artist" />
										<span>Foley Artist</span>
									</label>
									<label className="form-checkbox-label">
										<Field name="title" type="radio" value="editor" />
										<span>Editor</span>
									</label>
									<label className="form-checkbox-label">
										<Field name="title" type="radio" value="Colourist" />
										<span>Colourist</span>
									</label>
									<label className="form-checkbox-label">
										<Field name="title" type="radio" value="music supervisor" />
										<span>Music Supervisor</span>
									</label>
									<label className="form-checkbox-label">
										<Field name="title" type="radio" value="composer" />
										<span>Composer</span>
									</label>
									<label className="form-checkbox-label">
										<Field name="title" type="radio" value="music performer" />
										<span>Music Performer</span>
									</label>
								</>
							}
							</div>
							<div className="error">
								<ErrorMessage name="title" />
							</div>
						</div>

						<button disabled={loading ? true : false} className="form-submit" type="submit">Submit</button>
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

export default CreatePersonRole