import Link from 'next/link'
import useSWR from 'swr'
import { fetcher } from '../utils/searchHooks'
import LinkDisplay from './LinkDisplay'

const Grid = ({ data, type }) => {
	// const { data, error } = useSWR(url, fetcher)

	// if (error) return <div>Failed to load</div>
 	// if (!data) return <div>Loading...</div>
 	if(type == 'film'){
	  return (
	  	<section>
	  		{
	  			data.map((film) => {
	  				return (
	  					<div>
								<Link href={`/films/${film.slug}`}>
									<a title={film.name}>
									{
										film.poster.url ? 
										<Image
											src={film.poster.url}
											alt={`${film.name} poster`}
											width={100}
											height={150}
										/> :
										<EmptyPhoto type='poster' small={true}/>
									}
									<div>
										<h3>{film.name}</h3>
										{film.releaseDate && <p>{new Date(film.releaseDate).getFullYear()}</p>}
									</div>
									</a>
								</Link>
							</div>
	  				)
	  			})
	  		}
	  	</section>
	  )
	}

	if(type == 'series'){
	  return (
	  	<section>
	  		{
	  			data.map((series) => {
	  				return (
	  					<div>
								<Link href={`/series/${series.slug}`}>
									<a title={series.name}>
									{
										series.poster.url ? 
										<Image
											src={series.poster.url}
											alt={`${series.name} poster`}
											width={100}
											height={150}
										/> :
										<EmptyPhoto type='poster' small={true}/>
									}
									<div>
										<h3>{series.name}</h3>
										{series.releaseDate && <p>{new Date(series.releaseDate).getFullYear()}</p>}
									</div>
									</a>
								</Link>
							</div>
	  				)
	  			})
	  		}
	  	</section>
	  )
	}

	if(type == 'person'){
	  return (
	  	<section>
	  		{
	  			data.map((person) => {
	  				return (
	  					<div>
								<Link href={`/people/${person.slug}`}>
									<a title={person.name}>
									{
										person.photoUrl ? 
										<Image
											src={person.photoUrl}
											alt={`${person.name} display photo`}
											width={100}
											height={100}
										/> :
										<EmptyPhoto type='poster' small={true}/>
									}
									<div>
										<h3>{person.name}</h3>
										<p>{person.role}</p>
										{person.characterName && <p>person.characterName</p>}
									</div>
									</a>
								</Link>
							</div>
	  				)
	  			})
	  		}
	  	</section>
	  )
	}

	if(type == 'company'){
	  return (
	  	<section>
	  		{
	  			data.map((company) => {
	  				return (
	  					<div>
								<Link href={`/people/${company.slug}`}>
									<a title={company.name}>
									{
										company.photoUrl ? 
										<Image
											src={company.photoUrl}
											alt={`${company.name} display photo`}
											width={100}
											height={100}
										/> :
										<EmptyPhoto type='picture' small={true}/>
									}
									<div>
										<h3>{company.name}</h3>
									</div>
									</a>
								</Link>
							</div>
	  				)
	  			})
	  		}
	  	</section>
	  )
	}
}

export default Grid