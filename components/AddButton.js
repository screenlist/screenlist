import Link from 'next/link'

const AddButton = (props) => {
	const type = props.type
	if(type == 'film'){
		return(
			<Link href='/films/add'>
				<a className="button-good">Add Film</a>
			</Link>
		)
	}

	if(type == 'series'){
		return(
			<Link href='/series/add'>
				<a className="button-good">Add Series</a>
			</Link>
		)
	}

	if(type == 'company'){
		return(
			<Link href='/companies/add'>
				<a className="button-good">Add Company</a>
			</Link>
		)
	}

	if(type == 'person'){
		return(
			<Link href='/people/add'>
				<a className="button-good">Add People</a>
			</Link>
		)
	}
}

export default AddButton