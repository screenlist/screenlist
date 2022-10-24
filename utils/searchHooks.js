import useSWR from 'swr'
import { baseUrl } from './fetch'

export const fetcher = (...args) => fetch(...args).then(res => res.json())

export const useQuickSearch = (name, resource) => {
	if(resource == 'films'){
		const { data, error } = useSWR(`${baseUrl}/search/quick?film=${name}`, fetcher)

		return {
			data: data,
			isLoading: !error && !data,
			isError: error
		}
	}

	if(resource == 'series'){
		const { data, error } = useSWR(`${baseUrl}/search/quick?series=${name}`, fetcher)

		return {
			data: data,
			isLoading: !error && !data,
			isError: error
		}
	}

	if(resource == 'people'){
		const { data, error } = useSWR(`${baseUrl}/search/quick?people=${name}`, fetcher)

		return {
			data: data,
			isLoading: !error && !data,
			isError: error
		}
	}

	if(resource == 'companies'){
		const { data, error } = useSWR(`${baseUrl}/search/quick?companies=${name}`, fetcher)

		return {
			data: data,
			isLoading: !error && !data,
			isError: error
		}
	}

	if(resource == 'platforms'){
		const { data, error } = useSWR(`${baseUrl}/search/quick?platforms=${name}`, fetcher)

		return {
			data: data,
			isLoading: !error && !data,
			isError: error
		}
	}
}