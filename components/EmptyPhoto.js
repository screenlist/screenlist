import Image from 'next/image'

const EmptyPhoto = (props) => {
	const type = props.type // picture, still, poster
	const small = props.small // boolean
	if(type == 'picture'){
		small == true ?
		<Image
			src='/photos/picture.png'
			alt="a placeholder image"
			width={100}
			height={100}
		/> :
		<Image
			src='/photos/picture.png'
			alt="a placeholder image"
			width={720}
			height={720}
		/>
	}

	if(type == 'poster'){
		small == true ?
		<Image
			src='/photos/poster.png'
			alt="a placeholder image"
			width={100}
			height={150}
		/> :
		<Image
			src='/photos/poster.png'
			alt="a placeholder image"
			width={1000}
			height={1500}
		/>
	}

	if(type == 'still'){
		small == true ?
		<Image
			src='/photos/still.png'
			alt="a placeholder image"
			width={192}
			height={108}
		/> :
		<Image
			src='/photos/still.png'
			alt="a placeholder image"
			width={1920}
			height={1080}
		/>
	}
}