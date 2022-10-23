import Link from 'next/link'
import useRouter from 'next/router'
import { useState } from 'react'
import useAuthContext from '../utils/useAuthContext'
import { getItems, getOneItem, baseUrl } from '../utils/fetch'
import ProfileCore from '../components/ProfileCore'

const Profile = () => {
	const { currentUser, setCurrentUser } =  useAuthContext()

	// Error, learn how to use useRouter
	if(!currentUser){
		useRouter('/users/signin')
	}

	return(<h1>Profile</h1>)
}

export default Profile