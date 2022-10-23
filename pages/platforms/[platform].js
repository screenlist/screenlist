import Link from 'next/link'
import { useState } from 'react'
import useAuthContext from '../../utils/useAuthContext'
import { getItems, getOneItem, baseUrl } from '../../utils/fetch'

const Platform = ({data}) => {
	return(
		<h1>A platfomr here</h1>
	)
}

export async function getStaticProps({ params }) {
	const { platform } = params
	const data = await getOneItem(platform, 'platforms')

	return {
		props: { data },
		revalidate: 30
	}
}

export async function getStaticPaths() {
	const platforms = await getItems('platforms')

	const paths = platforms.map((item) => ({
		params: { platform: item.id }
	}))

	return { paths, fallback: 'blocking' }
}

export default Platform