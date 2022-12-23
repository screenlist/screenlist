import algoliasearch from 'algoliasearch/lite'
import { InstantSearch } from 'react-instantsearch-hooks-web'
import 'instantsearch.css/themes/satellite.css'

const searchClient = algoliasearch(process.env.NEXT_PUBLIC_AL_APPID, process.env.NEXT_PUBLIC_AL_SEARCH);

const AlgoliaSearch = ({children}) => {
	return (
		<InstantSearch 
			searchClient={searchClient} 
			indexName="films"
		 >
			{children}
		</InstantSearch>
	);
}

export default AlgoliaSearch