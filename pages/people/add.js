import CreatePersonForm from '../../components/CreatePersonForm'
import LoadingState from '../../components/LoadingState'
import useAuthContext from '../../utils/useAuthContext'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

const AddPerson = () => {
	const { currentUser, username, role } = useAuthContext()
	const router = useRouter()

	useEffect(() => {
		if(!currentUser || !username){
			router.push('/users/signin')
		}
	}, [])

	if(!currentUser || !username) {
		return <LoadingState page="true" />
	}

	return (
		<div className="form-page">
			<CreatePersonForm/>
		</div>
	)
}

export default AddPerson