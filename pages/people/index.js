import CreateFilmForm from '../../components/CreateFilmForm'
import AddButton from '../../components/AddButton'
import Link from 'next/link'
import useAuthContext from '../../utils/useAuthContext'
import { getItems, baseUrl } from '../../utils/fetch'
import EmptyPhoto from '../../components/EmptyPhoto'
import styles from '../../styles/PeoplePage.module.css'
import EmptyState from '../../components/EmptyState'

const People = ({people}) => {
	console.log(people)
	return (
		<section className={styles.pageContainer}>
			<div className={styles.headingBand}>
				<h1>People</h1>
				<AddButton type='person' />
			</div>
			{ people.length < 1 && <EmptyState text="Nothing to see here, yet" height="70vh" /> }
			<div className={styles.viewContainer}>
				{
					people.map((person) => {
						// Truncate long names
						const nameProcess = person.name.split(' ')
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
							<div key={person.id}>
								<Link href={`/people/${person.id}`}>
									<a title={person.name}>
										<div className={styles.container}>
											{
												person.profilePictureUrl ?
												<figure>
													<Image 
														src={person.profilePictureUrl}
														alt={`${person.name}'s' display picture`}
														width={240}
														height={240}
													/>
												</figure> :
												<figure>
													<EmptyPhoto type='picture' small='true' />
												</figure>
											}
											<h2 className={`h4 ${person.name.length > 20 || truncate ? styles.titleText : null}`}>{person.name}</h2>
										</div>
									</a>
								</Link>
							</div>
						)
					})
				}
			</div>
		</section>
	)
}

export async function getStaticProps() {
	const people = await getItems('people')
	
	return {
		props: { people },
		revalidate: 30
	}
}

export default People