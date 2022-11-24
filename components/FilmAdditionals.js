import Link from 'next/link'
import Image from 'next/image'
import styles from '../styles/FilmAdditionals.module.css'
import EmptyPhoto from './EmptyPhoto'
import EmptyState from './EmptyState'

const FilmAdditionals = ({stills, actors, crew, producers, distributors, reviews, history}) => {
	return (
		<section className={styles.container}>
			<section className={styles.contentMain}>
				<section className={styles.stillsContainer}>
					{ 
						stills[0] ? 
						<figure>
							<Image 
								src={stills[0]['url']}
								alt={stills[0]['description']}
								width={960}
								height={540}
							/>
						</figure> :
						<figure>
							<EmptyPhoto type='still' />
						</figure>
					}
					{ 
						stills[1] ? 
						<figure>
							<Image 
								src={stills[1]['url']}
								alt={stills[1]['description']}
								width={960}
								height={540}
							/>
						</figure> :
						<figure>
							<EmptyPhoto type='still' />
						</figure>
					}
					{ 
						stills[2] ? 
						<figure>
							<Image 
								src={stills[2]['url']}
								alt={stills[2]['description']}
								width={960}
								height={540}
							/>
						</figure> :
						<figure>
							<EmptyPhoto type='still' />
						</figure>
					}
				</section>
				<section>
					<div className={styles.titleBand}>
						<h2 className="h3">Cast</h2>
						<button type="button" className="button-awe">Edit</button>
					</div>
					{
						actors?.length ? 
						<div></div> :
						<EmptyState text='No cast members' height="10rem" />
					}
				</section>
				<section>
					<div className={styles.titleBand}>
						<h2 className="h3">Crew</h2>
						<button type="button" className="button-awe">Edit</button>
					</div>
					{
						crew?.length ? 
						<div></div> :
						<EmptyState text='No crew members' height="10rem" />
					}
				</section>
				<section>
					<div className={styles.titleBand}>
						<h2 className="h3">Production Companies</h2>
						<button type="button" className="button-awe">Edit</button>
					</div>
					{
						producers?.length ? 
						<div></div> :
						<EmptyState text='No production companies' height="10rem" />
					}
				</section>
				<section>
					<div className={styles.titleBand}>
						<h2 className="h3">Distribution Companies</h2>
						<button type="button" className="button-awe">Edit</button>
					</div>
					{
						distributors?.length ? 
						<div></div> :
						<EmptyState text='No distribution companies' height="10rem" />
					}
				</section>
			</section>
			<section className={styles.contentSecondary}>
				<div>
					<div className={styles.titleBand}>
						<h2 className="h3">Reviews</h2>
						<button type="button" className="button-awe">Add</button>
					</div>
					{
						reviews?.length ? 
						<div></div> :
						<EmptyState text='No reviews' height="10rem" />
					}
				</div>
				<div>
					<div className={styles.titleBand}>
						<h2 className="h3">History</h2>
					</div>
					{
						history?.length ? 
						<div></div> :
						<EmptyState text='No cast members' height="10rem" />
					}
				</div>
			</section>
		</section>
	)
}

export default FilmAdditionals