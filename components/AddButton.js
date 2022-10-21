import Link from 'next/link'

const AddButton = (props) => {
	const type = props.type
	if(type = 'film'){
		return(
			<Link href='/films/add'>Add film</Link>
		)
	}
}

export default AddButton