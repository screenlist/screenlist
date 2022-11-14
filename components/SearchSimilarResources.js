import { useQuickSearch } from '../utils/searchHooks'

const SearchSimilarResources = ({name, resource, className}) => {
	const { data, isLoading, isError } = useQuickSearch(name, resource)

	if(!name){
		return (
			<section className={className}>
				<h3>Similar {resource}</h3>
				<p>This card helps you avoid adding duplicates.</p>
			</section>
		)
	}

	if(isLoading){
		return (
			<section className={className}>
				<h3>Similar {resource}</h3>
				<p>Loading...</p>
			</section>
		)
	}

	if(isError){
		return (
			<section className={className}>
				<h3>Similar {resource}</h3>
				<p>Something went wrong...</p>
			</section>
		)
	}

	return (
		<section className={className}>
			<h3>Similar {resource}</h3>
			<p>{data.length} {resource} found.</p>
			<ul>
				{data.map((item) => (<li key={item.name}>{item.name}</li>))}
			</ul>
		</section>
	)
}

export default SearchSimilarResources