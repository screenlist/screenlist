import Link from 'next/link'
import Image from 'next/image'
import EmptyPhoto from './EmptyPhoto'

const EditDetails = ({ field, message, type, id }) => {
	if(type == 'film'){
		return (
			<Link href={`/films/edit#${field}?id=${id}`} >
				<a>{message}</a>
			</Link>
		)
	}

	if(type == 'series'){
		return (
			<Link href={`/series/edit#${field}?id=${id}`} >
				<a>{message}</a>
			</Link>
		)
	}

	if(type == 'company'){
		return (
			<Link href={`/companies/edit#${field}?id=${id}`} >
				<a>{message}</a>
			</Link>
		)
	}

	if(type == 'person'){
		return (
			<Link href={`/people/edit#${field}?id=${id}`} >
				<a>{message}</a>
			</Link>
		)
	}

	if(type == 'platform'){
		return (
			<Link href={`/platforms/edit#${field}?id=${id}`} >
				<a>{message}</a>
			</Link>
		)
	}
}


const ResourceDetails = ({ type, data }) => {
	if(type == 'film'){
		return (
			<section>
				<h1>{data.name}</h1>
				<div>
					{
						data.poster ?
						<Image 
							src={data.poster.url}
							alt={`${data.name} poster`}
							width={500}
							height={750}
						/> :
						<EmptyPhoto type='poster' /> 
					}
				</div>
				<h2>Details</h2>
				<div>
					<div>
						<h3>Stage</h3>
						<p>{data.productionStage}</p>
					</div>
					<div>
						<h3>{data.type} - {data.format} Film</h3>
					</div>
					<div>
						<h3>Logline</h3>
						<p>{data.logline}</p>
					</div>
					<div>
						<h3>Plot Summary</h3>
						<p>
							{
								data.plotSummary ? 
								data.plotSummary : 
								<EditDetails 
									type={type}
									id={data.id}
									field='plotSummary'
									message='Add a plot summary'
								/>
							}
						</p>
					</div>
					<div>
						<h3>Runtime</h3>
						<p>{
							data.runtime ? 
							<span>{data.runtime} minutes</span> : 
							<EditDetails 
								type={type}
								id={data.id}
								field='runtime'
								message='Add a runtime'
							/>
						}</p>
					</div>
					<div>
						<h3>Release Date</h3>
						<p>{
							data.releaseDate ? 
							<span>{new Date(data.releaseDate).toLocaleDateString()}</span> : 
							<EditDetails 
								type={type}
								id={data.id}
								field='releaseDate'
								message='Add a release date'
							/>
						}</p>
					</div>
					<div>
						<h3>Initial Platform</h3>
						<p>{
							data.initialPlatform ? 
							<span>{data.initialPlatform}</span> : 
							<EditDetails 
								type={type}
								id={data.id}
								field='initialPlatform'
								message='Add the intial platform where it first screened'
							/> 
						}</p>
					</div>
					<div>
						<h3>Genres</h3>
						{
							data.genres ?
							<ul>
								{
									data.genres.map((genre) => <li>{genre}</li>)
								}
							</ul> :
							<EditDetails 
								type={type}
								id={data.id}
								field='genres'
								message='Add genres'
							/>
						}
					</div>
				</div>
			</section>
		)
	}

	if(type == 'series'){
		return (
			<section>
				<h1>{data.name}</h1>
				<div>
					{
						data.poster ?
						<Image 
							src={data.poster.url}
							alt={`${data.name} poster`}
							width={500}
							height={750}
						/> :
						<EmptyPhoto type='poster' /> 
					}
				</div>
				<h2>Details</h2>
				<div>
					<div>
						<h3>Stage</h3>
						<p>{data.productionStage}</p>
					</div>
					<div>
						<h3>{data.type}</h3>
					</div>
					<div>
						<h3>Logline</h3>
						<p>{data.logline}</p>
					</div>
					<div>
						<h3>Plot Summary</h3>
						<p>
							{
								data.plotSummary ? 
								data.plotSummary : 
								<EditDetails 
									type={type}
									id={data.id}
									field='plotSummary'
									message='Add a plot summary'
								/>
							}
						</p>
					</div>
					<div>
						<h3>Total Seasons</h3>
						<p>{data.seasons}</p>
					</div>
					<div>
						<h3>Total Episodes</h3>
						<p>{data.episodes}</p>
					</div>
					<div>
						<h3>Episodes Runtime</h3>
						<p>{
							data.episodesRuntime ? 
							<span>{data.episodeRuntime} minutes</span> : 
							<EditDetails 
								type={type}
								id={data.id}
								field='runtime'
								message='Add a runtime'
							/>
						}</p>
					</div>
					<div>
						<h3>Release Date</h3>
						<p>{
							data.releaseDate ? 
							<span>{new Date(data.releaseDate).toLocaleDateString()}</span> : 
							<EditDetails 
								type={type}
								id={data.id}
								field='releaseDate'
								message='Add a release date'
							/>
						}</p>
					</div>
					<div>
						<h3>Last Aired</h3>
						<p>{
							data.lastEpisodeDate ? 
							<span>{new Date(data.lastEpisodeDate).toLocaleDateString()}</span> : 
							<EditDetails 
								type={type}
								id={data.id}
								field='lastEpisodeDate'
								message='Add date'
							/>
						}</p>
					</div>
					<div>
						<h3>Original Platform</h3>
						<p>{
							data.originalPlatform ? 
							<span>{data.initialPlatform}</span> : 
							<EditDetails 
								type={type}
								id={data.id}
								field='originalPlatform'
								message='Add the platform where it originally aired'
							/>
						}</p>
					</div>
					<div>
						<h3>Genres</h3>
						{
							data.genres ?
							<ul>
								{
									data.genres.map((genre) => <li>{genre}</li>)
								}
							</ul> :
							<EditDetails 
								type={type}
								id={data.id}
								field='genres'
								message='Add genres'
							/>
						}
					</div>
				</div>
			</section>
		)
	}

	if(type == 'company'){
		return(
			<section>
				<h1>{data.name}</h1>
				<div>
					{
						data.profilePhotoUrl ?
						<Image 
							src={data.profilePhotoUrl}
							alt={`${data.name} logo`}
							width={500}
							height={750}
						/> :
						<EmptyPhoto type='picture' /> 
					}
				</div>
				<div>
					<h2>Description</h2>
					<p>{
						data.description ?
						data.description :
						<EditDetails
							type={type}
							message='Add company description'
							field='description'
							id={data.id}
						/>
					}</p>
				</div>
				<div>
					<h3>Website</h3>
					<p>{
						data.website ? 
						data.website :
						<EditDetails
							type={type}
							message='Add company website'
							field='website'
							id={data.id}
						/>
					}</p>
				</div>
			</section>
		)
	}

	if(type == 'person'){
		return(
			<section>
				<h1>{data.name}</h1>
				<div>
					{
						data.profilePhotoUrl ?
						<Image 
							src={data.profilePhotoUrl}
							alt={`${data.name} logo`}
							width={500}
							height={750}
						/> :
						<EmptyPhoto type='picture' /> 
					}
				</div>
				<div>
					<h2>Description</h2>
					<p>{
						data.description ?
						data.description :
						<EditDetails
							type={type}
							message='Add person description'
							field='description'
							id={data.id}
						/>
					}</p>
				</div>
			</section>
		)
	}

	if(type == 'platform'){
		return(
			<section>
				<h1>{data.name}</h1>
				<div>
					{
						data.profilePhotoUrl ?
						<Image 
							src={data.profilePhotoUrl}
							alt={`${data.name} logo`}
							width={500}
							height={750}
						/> :
						<EmptyPhoto type='picture' /> 
					}
				</div>
				<div>
					<h2>Description</h2>
					<p>{
						data.description ?
						data.description :
						<EditDetails
							type={type}
							message='Add platform description'
							field='description'
							id={data.id}
						/>
					}</p>
				</div>
				<div>
					<h3>Website</h3>
					<p>{
						data.website ? 
						data.website :
						<EditDetails
							type={type}
							message='Add platform website'
							field='website'
							id={data.id}
						/>
					}</p>
				</div>
			</section>
		)
	}
}

export default ResourceDetails