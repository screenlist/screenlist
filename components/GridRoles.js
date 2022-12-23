import Link from 'next/link'
import Image from 'next/image'
import useSWR from 'swr'
import { fetcher } from '../utils/searchHooks'
import LinkDisplay from './LinkDisplay'
import styles from '../styles/GridRoles.module.css'

const GridRoles = ({ data, type }) => {
	// const { data, error } = useSWR(url, fetcher)

	// if (error) return <div>Failed to load</div>
 	// if (!data) return <div>Loading...</div>

	if(type == 'personRole'){
	  return (
	  	<section className={styles.container}>
	  		{
	  			data.map((item) => {
	  				// Truncate long names
	  				const nameProcess = item.personName.split(' ')
	  				let truncate = false
	  				let index = 0
	  				while(truncate == false && index <= nameProcess.length){
	  					const count = nameProcess[index]?.length
	  					if(count > 11){
	  						truncate = true
	  					}
	  					index++
	  				}
	  				return (
							<Link href={`/people/${item.personId}`} key={item.id}>
								<a title={item.personName} className={styles.itemContainer}>
									<figure className={styles.imageContainer}> 
										<Image
											src={item.photoUrl ? item.photoUrl : '/photos/picture.png'}
											alt={item.photoUrl ? `${item.photoUrl} display photo` : 'placeholder photo'}
											width={100}
											height={100}
										/>
									</figure>
									<h3 className={`${styles.text} h4 ${item.personName.length > 20 || truncate ? styles.titleText : null}`}>{item.personName}</h3>
									<p className={`${styles.text} ${styles.titleText}`}>{item.category == 'cast' ? item.characterName : item.title}</p>										
								</a>
							</Link>
	  				)
	  			})
	  		}
	  	</section>
	  )
	}
}

export default GridRoles