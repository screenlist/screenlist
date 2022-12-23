import Link from 'next/link'
import Image from 'next/image'
import styles from '../styles/FilmAdditionals.module.css'
import EmptyPhoto from './EmptyPhoto'
import EmptyState from './EmptyState'
import UploadPosterButton from './UploadPosterButton'
import CreatePersonRole from './CreatePersonRole'
import UpdatePhotoInfo from './UpdatePhotoInfo'
import GridRoles from './GridRoles'
import HistoryView from './HistoryView'

const FilmAdditionals = ({parentId, stills, actors, crew, producers, distributors, reviews}) => {
	let stillOne, stillTwo, stillThree;

	stills.forEach((item) => {
		if(item.id=='0'){stillOne = item}
		if(item.id=='1'){stillTwo = item}
		if(item.id=='2'){stillThree = item}
	})

	return (
		<section className={styles.container}>
			<section className={styles.contentMain}>
				<section className={styles.stillsContainer}>
					{ 
						stillOne ? 
						<figure>
							<Image 
								src={stillOne.url}
								alt="still picture"
								width={960}
								height={540}
							/>
							<UploadPosterButton photo='stills' type="films" id={parentId} imageIndex="0" posterObject={stillOne} />
							<div className="title-band" style={{padding: "0 0.5rem"}}>
								<p className="title-slim">{stillOne.credit ? <><span>&#169; </span>{stillOne.credit}</> : "Add photo credit"}</p>
							</div>
						</figure> :
						<figure>
							<EmptyPhoto type='still' />
							<UploadPosterButton photo='stills' type="films" id={parentId} imageIndex="0" />
						</figure>
					}
					{ 
						stillTwo ? 
						<figure>
							<Image 
								src={stillTwo.url}
								alt="still picture"
								width={960}
								height={540}
							/>
							<UploadPosterButton photo='stills' type="films" id={parentId} imageIndex="1" posterObject={stillTwo} />
							<div className="title-band" style={{padding: "0 0.5rem"}}>
								<p className="title-slim">{stillTwo.credit ? <><span>&#169; </span> {stillTwo.credit}</>  : "Add photo credit"}</p>
							</div>
						</figure> :
						<figure>
							<EmptyPhoto type='still' />
							<UploadPosterButton photo='stills' type="films" id={parentId} imageIndex="1" />
						</figure>
					}
					{ 
						stillThree ? 
						<figure>
							<Image 
								src={stillThree.url}
								alt="still picture"
								width={960}
								height={540}
							/>
							<UploadPosterButton photo='stills' type="films" id={parentId} imageIndex="2" posterObject={stillThree} />
							<div className="title-band" style={{padding: "0 0.5rem"}}>
								<p className="title-slim">{stillThree.credit ? <><span>&#169; </span> {stillThree.credit}</>  : "Add photo credit"}</p>
							</div>
						</figure> :
						<figure>
							<EmptyPhoto type='still' />
							<UploadPosterButton photo='stills' type="films" id={parentId} imageIndex="2" />
						</figure>
					}
				</section>
				<section>
					<div className={styles.titleBand}>
						<h2 className="h3">Cast</h2>
						<CreatePersonRole id={parentId} kind='Film' category="cast" />
					</div>
					{
						actors?.length ? 
						<GridRoles data={actors} type='personRole' /> :
						<EmptyState text='No cast members' height="10rem" />
					}
				</section>
				<section>
					<div className={styles.titleBand}>
						<h2 className="h3">Crew</h2>
						<CreatePersonRole id={parentId} kind='Film' category="crew" />
					</div>
					{
						crew?.length ? 
						<GridRoles data={crew} type='personRole' /> :
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
						<h2 className="h3">Ratings</h2>
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
					<HistoryView path={`films/${parentId}/history`} />
				</div>
			</section>
		</section>
	)
}

export default FilmAdditionals