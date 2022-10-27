import Link from 'next/link'
import { useState } from 'react'
import useAuthContext from '../../utils/useAuthContext'
import { getItems, getOneItem, baseUrl } from '../../utils/fetch'

const Company = ({data}) => {
	return(
		<h1>A company here</h1>
	)
}

export async function getStaticProps({ params }) {
	const { id } = params
	const data = await getOneItem(id, 'companies')

	return {
		props: { data },
		revalidate: 30
	}
}

export async function getStaticPaths() {
	const companies = await getItems('companies')

	const paths = companies.map((item) => ({
		params: { id: item.id }
	}))

	return { paths, fallback: 'blocking' }
}

export default Company