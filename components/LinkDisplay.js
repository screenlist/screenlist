import Link from 'next/link'
import Image from 'next/image'
import EmptyPhoto from './EmptyPhoto'

const LinkDisplay = ({url, posterUrl, title, year}) => {
	return (
		<div>
			<Link href={url}>
				<a title={title}>
				{
					posterUrl ? 
					<Image
						src={posterUrl}
						alt={`${title} poster`}
						width={100}
						height={150}
					/> :
					<EmptyPhoto type='poster' small={true}/>
				}
				<div>
					<p>{title}</p>
					{year && <p>{year}</p>}
				</div>
				</a>
			</Link>
		</div>
	)
}

export default LinkDisplay