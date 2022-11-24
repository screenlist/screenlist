import CreateFilmForm from '../../components/CreateFilmForm'
import AddButton from '../../components/AddButton'
import Link from 'next/link'
import useAuthContext from '../../utils/useAuthContext'
import { getItems, baseUrl } from '../../utils/fetch'
import EmptyPhoto from '../../components/EmptyPhoto'
import styles from '../../styles/FilmsPage.module.css'

const Films = ({films}) => {
	console.log(films)
	return (
		<section className={styles.pageContainer}>
			<div className={styles.headingBand}>
				<h1>Films</h1>
				<AddButton type='film' />
			</div>
			<div className={styles.viewContainer}>
				{
					films.map((film) => {
						return (
							<div key={film.id}>
								<Link href={`/films/${film.id}`}>
									<a title={film.name}>
										<div className={styles.container}>
											{
												film.posterUrl ?
												<figure>
													<Image 
														src={posterUrl}
														alt={`${film.name} film poster`}
														width={240}
														height={360}
													/>
												</figure> :
												<figure>
													<EmptyPhoto type='poster' small='true' />
												</figure>
											}
											<h2 className="h4 flexible">{film.name}</h2>
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
	const films = await getItems('films')
	console.log(films)
	return {
		props: { films },
		revalidate: 30
	}
}

export default Films