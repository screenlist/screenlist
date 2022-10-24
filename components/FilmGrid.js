import Link from 'next/link'
import useSWR from 'swr'
import { fetcher } from '../utils/searchHooks'
import MiniDisplayMedia from './MiniDisplayMedia'

const FilmGrid = ({ url }) => {
	const { data, error } = useSWR(url, fetcher)

	if (error) return <div>Failed to load</div>
  if (!data) return <div>Loading...</div>

  return (
  	<section>
  		{
  			data.map((film) => {
  				return (
  					<MiniDisplayMedia 
  						url={`/films/${data.slug}`}
  						posterUrl={data.posterUrl ? data.posterUrl : null}
  						title={data.title}
  						year={data.year ? data.year : null}
  					/>
  				)
  			})
  		}
  	</section>
  )
}

export default FilmGrid