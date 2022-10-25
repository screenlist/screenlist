import Link from 'next/link'
import { useState } from 'react'
import useAuthContext from '../../../utils/useAuthContext'
import { getItems, getOneItem, baseUrl } from '../../../utils/fetch'

const Series = ({data}) => {
	return(
		<h1>A series here</h1>
	)
}

export async function getStaticProps({ params }) {
	const { id } = params
	const data = await getOneItem(id, 'series')

	return {
		props: { data },
		revalidate: 30
	}
}

export async function getStaticPaths() {
	const series = await getItems('series')

	const paths = series.map((item) => ({
		params: { id: item.id }
	}))

	return { paths, fallback: 'blocking' }
}

export default Series