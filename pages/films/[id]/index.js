import Link from 'next/link'
import { useState } from 'react'
import useAuthContext from '../../../utils/useAuthContext'
import { getItems, getOneItem, baseUrl } from '../../../utils/fetch'
import LoadingState from '../../../components/LoadingState'
import FilmDetails from '../../../components/FilmDetails'
import FilmAdditionals from '../../../components/FilmAdditionals'

const Film = ({data}) => {
	console.log(data)
	return(
		<div>
			<h1 className="uni-pad">{data.details.name}</h1>
			<div className="layout-progressive">
				<FilmDetails data={data.details} poster={data.poster} />
				<FilmAdditionals 
					parentId={data.details.id}
					stills={data.stills} 
					producers={data.producers}
					distributors={data.distributors}
					actors={data.cast}
					crew={data.crew}
				/>
			</div>
		</div>
	)
}

export async function getStaticProps({ params }) {
	const { id } = params
	const data = await getOneItem(id, 'films')

	return {
		props: { data },
	}
}

export async function getStaticPaths() {
	const films = await getItems('films')
	const paths = films.map((item) => ({
		params: { id: item.id }
	}))

	return { paths, fallback: 'blocking' }
}

export default Film