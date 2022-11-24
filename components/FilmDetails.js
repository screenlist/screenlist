import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { useRouter } from 'next/router'
import styles from '../styles/FilmDetails.module.css'
import EmptyPhoto from './EmptyPhoto'
import { auth } from '../utils/firebase-config'
import useAuthContext from '../utils/useAuthContext'
import LoadingState from './LoadingState'
import UploadPosterButton from './UploadPosterButton'

const FilmDetails = ({data}) => {

	return (
		<section className={styles.container}>
			{
				data.poster ?
				<figure>
					<Image 
						src={data.poster.url}
						alt={`${data.name} film poster`}
						width={480}
						height={720}
					/>
				</figure> :
				<figure>
					<EmptyPhoto type='poster' />
					<UploadPosterButton type="films" id={data.id} />
				</figure>
			}
			<div className={styles.titleBand}>
				<h2 className="h3">Details</h2>
				<button className="button-awe" type="button">Edit</button>
			</div>
			<div className={styles.detailsContainer}>
				<div className={styles.datailDataContainer}>
					{
						data?.genres.length > 0 ?
						<ul className={styles.listContainer}>
							{
								data.genres.map((genre) => {
									return <li key={genre}>{genre}</li>
								})
							}
						</ul> :
						<div>No genres</div>
					}
				</div>
				<div className={styles.datailDataContainer}>
					<h3 className="h4 flexible">Title</h3>
					<p>{data.name}</p>
				</div>
				<div className={styles.datailDataContainer}>
					<h3 className="h4 flexible">Logline</h3>
					<p>{data.logline}</p>
				</div>
				<div className={styles.datailDataContainer}>
					<h3 className="h4 flexible">Plot Summary</h3>
					{
						data.plotSummary ? 
						<p>{data.plotSummary}</p> :
						<p>No plot summary</p>
					}
				</div>
				<div className={styles.datailDataContainerFlex}>				
					<div className={styles.datailDataContainer}>
						<h3 className="h4 flexible">Type</h3>
						<p>{data.type[0].toUpperCase()+data.type.substring(1)}</p>
					</div>
					<div className={styles.datailDataContainer}>
						<h3 className="h4 flexible">Format</h3>
						<p>{data.format[0].toUpperCase()+data.format.substring(1)} Film</p>
					</div>
					<div className={styles.datailDataContainer}>
						<h3 className="h4 flexible">Release Date</h3>
						{
							data.releaseDate ? 
							<p>{new Date(data.releaseDate).toLocaleDateString()}</p> :
							<p>Add release date</p>
						}
					</div>
					<div className={styles.datailDataContainer}>
						<h3 className="h4 flexible">Runtime</h3>
						{
							data.runtime ? 
							<p>{data.runtime} minutes</p> :
							<p>No runtime</p>
						}
					</div>
					<div className={styles.datailDataContainer}>
						<h3 className="h4 flexible">Production Stage</h3>
						<p>{data.productionStage[0].toUpperCase()+data.productionStage.substring(1)}</p>
					</div>
				</div>				
				<div className={styles.datailDataContainer}>
					<h3 className="h4 flexible">Premiere Platform</h3>
					{
						data.initialPlatform ? 
						<p>{data.initialPlatform}</p> :
						<p>No premiere platform</p>
					}
				</div>
			</div>
		</section>
	)
}

export default FilmDetails