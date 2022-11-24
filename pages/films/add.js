import CreateFilmForm from '../../components/CreateFilmForm'
import LoadingState from '../../components/LoadingState'
import useAuthContext from '../../utils/useAuthContext'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

const AddFilm = () => {
	const { currentUser, username, role } = useAuthContext()
	const router = useRouter()

	if(!currentUser || !username) {
		useEffect(() => {
			router.push('/users/signup')
		}, [])
		return <LoadingState page="true" />
	}

	return (
		<div className="form-page">
			<CreateFilmForm/>
		</div>
	)
}

export default AddFilm