import Link from 'next/link'
import Image from 'next/image'
import styles from '../styles/ProfileCore.module.css'
import EmptyPhoto from './EmptyPhoto'

const ProfileCore = ({displayName, username, bio, role, pictureUrl}) => {
	return (
		<section className={styles.container} >
			<div className={styles.coreInfoContainer} >
				{
					pictureUrl ?
					<figure>
						<Image 
							src={pictureUrl}
							alt={`${username}'s profile image`}
							width={720}
							height={720}
						/>
					</figure> :
					<figure>
						<EmptyPhoto type='picture' />
					</figure>
				}
				<div className={styles.nameAndRoleContainer}>
					<p className={styles.username}>{username}</p>
					<p className={styles.role}>{role}</p>
				</div>
			</div>
			<div className={styles.bioContainer} >
				<h3>Bio</h3>
				{bio ? <p>{bio}</p> : <div>No user bio</div>}
			</div>
		</section>
	)
}

export default ProfileCore