import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import useAuthContext from '../utils/useAuthContext'
import { getItems, getOneItem, baseUrl } from '../utils/fetch'
import ProfileCore from '../components/ProfileCore'
import Grid from '../components/Grid'

const Profile = () => {
	const { currentUser, setCurrentUser } =  useAuthContext()

	const router = useRouter()

	
	useEffect(() => {
		if(!currentUser){
			router.push('/users/signin')
		}
	}, [])

	if(!currentUser){
		return (<p> </p>)
	}

	return (
		<div>
			<h1>Your profile</h1>
			<ProfileCore
				username={currentUser.userName}
				role={currentUser.role}
				pictureUrl={currentUser.photoUrl}
				bio={currentUser.bio}
			/>
		</div>
	)
}

export default Profile