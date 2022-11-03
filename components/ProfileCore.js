import Link from 'next/link'
import Image from 'next/image'
import EmptyPhoto from './EmptyPhoto'

const ProfileCore = ({displayName, username, bio, role, pictureUrl}) => {
	return (
		<section>
			<div>
				{
					pictureUrl ?
					<figure>
						<Image 
							src={pictureUrl}
							alt={`${username} profile image`}
							width={720}
							height={720}
						/>
					</figure> :
					<figure>
						<EmptyPhoto type='picture' />
					</figure>
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