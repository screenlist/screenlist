import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/router'
import useAuthContext from '../../utils/useAuthContext'
import { getItems, getOneItem, baseUrl } from '../../utils/fetch'
import ProfileCore from '../../components/ProfileCore'

const User = ({ user }) => {
	const { currentUser, setCurrentUser } = useAuthContext()
	const router = useRouter()

	if(currentUser){
		router.push('/profile')
		return (<p> </p>)
	}
	
	return (
		<div>
			<h1>User profile of {user.userName}</h1>
			<ProfileCore
				username={user.userName}
				role={user.role}
				pictureUrl={user.photoUrl}
				bio={user.bio}
			/>
		</div>
	)
}

export async function getStaticProps({ params }) {
	const { username } = params
	const user = await getOneItem(username, 'users')

	return {
		props: { user },
		revalidate: 30
	}
}

export async function getStaticPaths() {
	const users = await getItems('users')

	const paths = users.map((user) => ({
		params: { username: user.userName }
	}))

	return { paths, fallback: 'blocking' }
}

export default User