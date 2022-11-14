import Link from 'next/link'
import useAuthContext from '../../utils/useAuthContext'
import { getItems, baseUrl } from '../../utils/fetch'

const User = ({users}) => {
	return (
		<section>
			<h1>Users</h1>
			{
				users.map((user) => {
					return (
						<div key={user.uid}>
							<Link href={`/users/${user.userName}`}>
								<a title={user.userName}>
									<div>
										<h2>{user.userName}</h2>
										<p>{user.role}</p>
									</div>
								</a>
							</Link>
						</div>
					)
				})
			}
		</section>
	)
}

export async function getStaticProps() {
	const users = await getItems('users')

	return {
		props: { users },
		revalidate: 30
	}
}

export default User