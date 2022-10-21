import Link from 'next/link'
import Image from 'next/image'
import EmptyPhoto from './EmptyPhoto'

const ProfileCore = ({displayName, username, bio, role, pictureUrl}) => {
	return (
		<section>
			<div>
				{
					pictureUrl ?
					<fig>
						<Image 
							src={pictureUrl}
							alt={`${username} profile image`}
							width={720}
							height={720}
						/>
					</fig> :
					<fig>
						<EmptyPhoto type='picture' />
					</fig>
				}
				<div>
					{displayName && <p>{displayName}</p>}
					<div>
						<p>{username}</p>
						<p>{role}</p>
					</div>
				</div>
			</div>
			{	bio &&
				<div>
					<h3>Bio</h3>
					<p>{bio}</p>
				</div>
			}
		</section>
	)
}

export default ProfileCore