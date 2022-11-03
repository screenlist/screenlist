import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import useAuthContext from '../../../utils/useAuthContext'
import { getItems, getOneItem, baseUrl } from '../../../utils/fetch'
import ProfileCore from '../../../components/ProfileCore'
import SignOutButton from '../../../components/SignOutButton'

const User = ({ user }) => {
	const { currentUser, username } = useAuthContext()
	const [isSignedIn, setIsSignedIn] = useState(false)
	const router = useRouter()

	useEffect(() => {
		if(currentUser && username){
			if(currentUser.uid == user.uid && user.userName == username){
				setIsSignedIn(true)
			}
		}
	}, [])

	useEffect(() => {
		console.log(isSignedIn)
		if(isSignedIn){
			if(!currentUser.emailVerified){
				router.push('/users/verify-email')
			}
		}
	}, [isSignedIn])
		
	return (
		<div>
			<div>
				{isSignedIn ? <SignOutButton /> : (<Link href='/users/signup'><a>Create Account</a></Link>)}
			</div>
			<h1>{isSignedIn ? 'Your profile' : `User profile of ${user.userName}`}</h1>
			<ProfileCore
				username={user.userName}
				role={user?.role}
				pictureUrl={user?.photoUrl}
				bio={user?.bio}
			/>
		</div>
	)
}

export async function getStaticProps(context) {
	const { username } = context.params

	try{
		const user = await getOneItem(username, 'users')

		return {
			props: { user },
			revalidate: 30
		}
	} catch(err) {
		console.log(err)
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