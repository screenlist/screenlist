import { useState } from 'react'
import Image from 'next/image'
import { InstantSearch, SearchBox, Hits } from 'react-instantsearch-hooks-web'
import AlgoliaSearch from './AlgoliaSearch'
import styles from '../styles/Search.module.css'

const Search = () => {
	const [isOpen, setIsOpen] = useState(false)
	const openModal = () => {
		setIsOpen(true)
		document.querySelector('body').classList.add('no-scroll')
	}

	const closeModal = () => {
		setIsOpen(false)
		document.querySelector('body').classList.remove('no-scroll')
	}
	return (
		<>
			<button onClick={openModal} type='button' className="button-icon" >
				<Image 
					src="/search-icon.svg"
					alt="search icon"
					width={40}
					height={40}
				/>
			</button>
			{
				isOpen && 
				<div className="search-popup">					
					<div className={styles.container}>
						<AlgoliaSearch>
							<div className={styles.topBand}>
								<button onClick={closeModal} type='button' className={`button-icon ${styles.closeBand}`} >
									<Image 
										src="/close-icon.svg"
										alt="search icon"
										width={20}
										height={20}
									/>
								</button>
								<div className={styles.searchBox}>
									<SearchBox />
								</div>
							</div>
							<section className={styles.searchGrid}>
								<Hits hitComponent={Hit} />
							</section>
						</AlgoliaSearch>
					</div>
				</div>
			}
		</>
	)
}

function Hit({ hit }) {
	return (
		<article>
			<p>{hit.name}</p>
		</article>
	)
}

export default Search