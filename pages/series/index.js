import AddButton from '../../components/AddButton'
import Link from 'next/link'
import useAuthContext from '../../utils/useAuthContext'
import { getItems, baseUrl } from '../../utils/fetch'
import EmptyPhoto from '../../components/EmptyPhoto'
import styles from '../../styles/FilmsPage.module.css'

const Series = ({series}) => {
	console.log(series)
	return (
		<section className={styles.pageContainer}>
			<div className={styles.headingBand}>
				<h1>Series</h1>
				<AddButton type='series' />
			</div>
			<div className={styles.viewContainer}>
				{
					series.map((item) => {
						return (
							<div key={item.id}>
								<Link href={`/series/${item.id}`}>
									<a title={item.name}>
										<div className={styles.container}>
											{
												item.posterUrl ?
												<figure>
													<Image 
														src={posterUrl}
														alt={`${item.name} item poster`}
														width={240}
														height={360}
													/>
												</figure> :
												<figure>
													<EmptyPhoto type='poster' small='true' />
												</figure>
											}
											<h2 className="headline-four">{item.name}</h2>
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
	const series = await getItems('series')
	console.log(series)
	return {
		props: { series },
		revalidate: 30
	}
}

export default Series