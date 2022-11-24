import styles from '../styles/LoadingState.module.css'
export default function LoadingState({page}){
	if(page){
		return (
			<div className={styles.wholePageContainer}>
				<div role="loading state" className={styles['lds-ellipsis']}>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
				</div>
			</div>
		)
	}
	return (
		<div className={styles.container}>
			<div role="loading state" className={styles['lds-ellipsis']}>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
			</div>
		</div>
	)
}