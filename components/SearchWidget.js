import { useState } from 'react'
import Image from 'next/image'
import { InstantSearch, SearchBox, Hits, Index } from 'react-instantsearch-hooks-web'
import { useFormikContext } from 'formik'
import AlgoliaSearch from './AlgoliaSearch'
import styles from '../styles/Search.module.css'

const SearchWidget = ({setterFunction, index, field}) => {
	const { setFieldValue } = useFormikContext()
	const hitter = ({hit}) => (
		<article onClick={() => {setterFunction(hit); setFieldValue(field, hit.name)}}>
			<Image 
				src={hit.profilePhotoUrl ? hit.profilePhotoUrl : '/photos/picture.png'}
				alt={hit.profilePhotoUrl ? `${hit.profilePhotoUrl} photo` : 'placeholder photo'}
				width={50}
				height={50}
			/>
			<h2>{hit.name}</h2>
		</article>
	)
	return (		
		<div className={styles.container}>
			<AlgoliaSearch>
				<div className={styles.topBand}>
					<div className={styles.searchBox}>
						<SearchBox />
					</div>
				</div>
				<section className={styles.searchGrid}>
				<Index indexName={index} >
					<Hits hitComponent={hitter} />
				</Index>
				</section>
			</AlgoliaSearch>
		</div>
	)
}

export default SearchWidget