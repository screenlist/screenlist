import Link from 'next/link'
import styles from '../../../styles/ProfilePage.module.css'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import useAuthContext from '../../../utils/useAuthContext'
import { getItems, getOneItem, baseUrl } from '../../../utils/fetch'
import ProfileCore from '../../../components/ProfileCore'
import SignOutButton from '../../../components/SignOutButton'
import ProfileSettings from '../../../components/ProfileSettings'

const User = ({ user }) => {
	const { currentUser, username } = useAuthContext()
	const [isSignedIn, setIsSignedIn] = useState(false)
	const [isTheirProfile, setIsTheirProfile] = useState(false)
	const router = useRouter()


	const deleteAccount = () => {}


	useEffect(() => {
		if(currentUser && username){
			setIsSignedIn(true)
			if(currentUser.uid == user.uid && user.userName == username){
				setIsTheirProfile(true)
			}
		}
	}, [username, currentUser])

	console.log(isTheirProfile, isSignedIn)
		
	return (
		<div className={styles.pageContainer}>
			<div className={styles.topBand}>
				<h1>Profile</h1>
				{!isSignedIn && !isTheirProfile ? (<Link href='/users/signup'><a className="button-awe">Create Account</a></Link>) : null}
			</div>
			<div className={styles.coreAndSettings}>
				<ProfileCore
					username={user.userName}
					role={user?.role}
					pictureUrl={user?.photoUrl}
					bio={user?.bio}
				/>
				{isSignedIn && <ProfileSettings/>}
			</div>
		</div>
	)
}

export async function getStaticProps(context) {
	const { username } = context.params

	try{
		const user = await getOneItem(username, 'users')
		console.log(user)
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