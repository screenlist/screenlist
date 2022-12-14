import Link from 'next/link'
import { useState } from 'react'
import useAuthContext from '../../../utils/useAuthContext'
import { getItems, getOneItem, baseUrl } from '../../../utils/fetch'

const Person = ({data}) => {
	return(
		<h1>{data.name}</h1>
	)
}

export async function getStaticProps({ params }) {
	const { id } = params
	const data = await getOneItem(id, 'people')

	return {
		props: { data },
		revalidate: 30
	}
}

export async function getStaticPaths() {
	const people = await getItems('people')

	const paths = people.map((item) => ({
		params: { id: item.id }
	}))

	return { paths, fallback: 'blocking' }
}

export default Person