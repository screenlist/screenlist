import { useQuickSearch } from '../utils/searchHooks'

const SearchSimilarResources = ({name, resource}) => {
	const { data, isLoading, isError } = useQuickSearch(name, resource)

	if(!name){
		return (
			<section>
				<h3>Similar {resource}</h3>
				<p>This card helps you avoid adding duplicates.</p>
			</section>
		)
	}

	if(isLoading){
		return (
			<section>
				<h3>Similar {resource}</h3>
				<p>Loading...</p>
			</section>
		)
	}

	if(isError){
		return (
			<section>
				<h3>Similar {resource}</h3>
				<p>Something went wrong...</p>
			</section>
		)
	}

	return (
		<section>
			<h3>Similar {resource}</h3>
			<p>{data.length} {resource} found.</p>
			<ul>
				{data.map((item) => (<li key={item.name}>{item.name}</li>))}
			</ul>
		</section>
	)
}

export default SearchSimilarResources