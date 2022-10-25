import Link from 'next/link'
import Image from 'next/image'
import EmptyPhoto from './EmptyPhoto'
import Grid from './Grid'

const ResourceFeatures = ({ data, type }) => {
	if(type == 'film'){

		let placeholderStills = []
		for(let i = data.stills.length - 3; i <= 0; 1++){
			placeholderStills.push(<EmptyPhoto type='still' />)
		}

		return (
			<section>
				<section>
					<h2>Still shots</h2>
					{
						data.stills.map((item) => {
							return (
								<Image 
									src={item.url}
									alt={item.description}
									width={960}
									height={540}
								/>
							)
						})
					}
					{/* Display place holders if not all still are available */}
					{ placeholderStills }
				</section>
				<section>
					<h2>Cast</h2>
					{
						data.actors.length > 0 ?
						<Grid data={data.actors} type='person' /> :
						"No cast members found"
					}
				</section>
				<section>
					<h2>Crew</h2>
					{
						data.crew.length > 0 ?
						<Grid data={data.crew} type='person' /> :
						"No crew members found"
					}
				</section>
				<section>
					<h2>Production Companies</h2>
					{
						data.producers.length > 0 ?
						<Grid data={data.producers} type='company' /> :
						"No production companies found"
					}
				</section>
				<section>
					<h2>Production Companies</h2>
					{
						data.distributors.length > 0 ?
						<Grid data={data.distributors} type='company' /> :
						"No distributors found"
					}
				</section>
			</section>
		)
	}
}

export default ResourceFeatures