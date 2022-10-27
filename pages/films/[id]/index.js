import Link from 'next/link'
import { useState } from 'react'
import useAuthContext from '../../utils/useAuthContext'
import { getItems, getOneItem, baseUrl } from '../../utils/fetch'

const Film = ({data}) => {
	return(
		<h1>A film here</h1>
	)
}

export async function getStaticProps({ params }) {
	const { id } = params
	const data = await getOneItem(id, 'films')

	return {
		props: { data },
		revalidate: 30
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