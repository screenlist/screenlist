import Link from 'next/link'

const Contribute = () => {
	return (
		<section>
			<ul>
				<li>
					<Link href='/films/add'>
						<a>Add a new film</a>
					</Link>
				</li>
				<li>
					<Link href='/series/add'>
						<a>Add a new series</a>
					</Link>
				</li>
				<li>
					<Link href='/people/add'>
						<a>Add a new person</a>
					</Link>
				</li>
				<li>
					<Link href='/companies/add'>
						<a>Add a new company</a>
					</Link>
				</li>
				<li>
					<Link href='/platforms/add'>
						<a>Add a new platform</a>
					</Link>
				</li>
			</ul>
		</section>
	)
}

export default Contribute