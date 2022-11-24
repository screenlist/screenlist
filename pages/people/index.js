import CreateFilmForm from '../../components/CreateFilmForm'
import AddButton from '../../components/AddButton'
import Link from 'next/link'
import useAuthContext from '../../utils/useAuthContext'
import { getItems, baseUrl } from '../../utils/fetch'
import EmptyPhoto from '../../components/EmptyPhoto'
import styles from '../../styles/FilmsPage.module.css'

const People = ({people}) => {
	console.log(people)
	return (
		<section className={styles.pageContainer}>
			<div className={styles.headingBand}>
				<h1>people</h1>
				<AddButton type='people' />
			</div>
			<div className={styles.viewContainer}>
				{
					people.map((person) => {
						return (
							<div key={person.id}>
								<Link href={`/people/${person.id}`}>
									<a title={person.name}>
										<div className={styles.container}>
											{
												person.posterUrl ?
												<figure>
													<Image 
														src={person.profilePictureUrl}
														alt={`${person.name}'s' display picture`}
														width={240}
														height={360}
													/>
												</figure> :
												<figure>
													<EmptyPhoto type='poster' small='true' />
												</figure>
											}
											<h2 className="headline-four">{person.name}</h2>
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
	console.log(people)
	return {
		props: { people },
		revalidate: 30
	}
}

export default People