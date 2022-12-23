export const baseUrl = process.env.NEXT_PUBLIC_SERVER

export const refreshPath = async (path, token) => {
 	await fetch(`${baseUrl}/refresh`, {
 		method: 'POST',
		headers: {
			AuthorizationToken: token,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({path: path})
 	})
}

export const getItems = async (resource) => {
	if(resource == 'users'){
		const response = await  fetch(`${baseUrl}/users`)
		const data =  await response.json()
		return data
	}

	if(resource == 'series'){
		const response = await  fetch(`${baseUrl}/series`)
		const data =  await response.json()
		return data
	}

	if(resource == 'films'){
		const response = await  fetch(`${baseUrl}/films`)
		const data =  await response.json()
		return data
	}

	if(resource == 'companies'){
		const response = await  fetch(`${baseUrl}/companies`)
		const data =  await response.json()
		return data
	}

	if(resource == 'people'){
		const response = await  fetch(`${baseUrl}/people`)
		const data =  await response.json()
		return data
	}

	if(resource == 'platforms'){
		const response = await  fetch(`${baseUrl}/platforms`)
		const data =  await response.json()
		return data
	}

	if(resource == 'editorial'){
		const response = await  fetch(`${baseUrl}/content`)
		const data =  await response.json()
		return data
	}
}

export const getOneItem = async (param, resource) => {
	if(resource == 'users'){
		const response = await  fetch(`${baseUrl}/users/${param}`)
		const data =  await response.json()
		return data
	}

	if(resource == 'series'){
		const response = await  fetch(`${baseUrl}/series/${param}`)
		const data =  await response.json()
		return data
	}

	if(resource == 'films'){
		const response = await  fetch(`${baseUrl}/films/${param}`)
		const data =  await response.json()
		return data
	}

	if(resource == 'companies'){
		const response = await  fetch(`${baseUrl}/companies/${param}`)
		const data =  await response.json()
		return data
	}

	if(resource == 'people'){
		const response = await  fetch(`${baseUrl}/people/${param}`)
		const data =  await response.json()
		return data
	}

	if(resource == 'platforms'){
		const response = await  fetch(`${baseUrl}/platforms/${param}`)
		const data =  await response.json()
		return data
	}

	if(resource == 'editorial'){
		const response = await  fetch(`${baseUrl}/content/${param}`)
		const data =  await response.json()
		return data
	}
}